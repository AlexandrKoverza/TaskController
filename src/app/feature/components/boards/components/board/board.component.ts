import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Board } from 'src/app/mock-data/boards';
import { BoardsService } from 'src/app/services/boards.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  boards: Board[] = [];
  board$: Observable<Board> | undefined;
  todo: any
  progress: any
  done: any

  constructor(
    public boardsService: BoardsService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
    this.progress = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
    this.done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  }

  ngOnInit(): void {
      this.board$ = this.activatedRoute.paramMap.pipe(
        switchMap((params: ParamMap) =>
        this.boardsService.getBoard(params.get('id')!))
    );
  }

  back() {
    this.router.navigate(['/boards']);
  }

  deleteBoard(id: number | string) {
    return this.boardsService.deleteItem(id).subscribe(() => {
      this.boards = this.boards.filter(item => item.id !==id)
      this.router.navigate(['/boards']);
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}


