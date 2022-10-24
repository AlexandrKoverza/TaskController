import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Board } from 'src/app/mock-data/boards';
import { BoardsService } from 'src/app/services/boards.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  boards: Board[] = [];
  board$: Observable<Board> | undefined;
  
  constructor(
    public boardsService: BoardsService,
    public activatedRoute: ActivatedRoute,
    public boardService: BoardService,
    private router: Router,
  ) {}

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

  onAddComment(event: {id: number, text: string}, columnId: number) {
    this.boardService.addComment(columnId, event.id, event.text)
  }

  onDeleteComment(comment: any, columnId: any, item: any) {
    this.boardService.deleteComment(columnId, item.id, comment.id)
  }

  onDeleteItem(itemId: number, columnId: number) {
    this.boardService.deleteItem(itemId, columnId)
  }

}


