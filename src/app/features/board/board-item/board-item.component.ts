import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { BoardsService } from 'src/app/services/boards.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder, Validators } from '@angular/forms';
import { boardColumns } from 'src/app/constants/board-columns';
import { BoardColumn } from 'src/app/models/board-column';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  boards: any[] = [];
  board$: Observable<any> = EMPTY;
  tasks: any[] = [];
  comments: any[] = [];
  boardColumns: BoardColumn[] = [...boardColumns];
    
  form = this.formBuilder.group({
    description: ['', Validators.required],
  });

  constructor(
    private boardsService: BoardsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.board$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.boardsService.getBoard(params.get('id')!)
      )
    );
  }

  back() {
    this.router.navigate(['/']);
  }

  deleteBoard(id: number | string) {
    return this.boardsService.deleteBoard(id).subscribe(() => {
      this.boards = this.boards.filter((item) => item.id !== id);
      this.router.navigate(['/']);
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addTask(type: string, color: string, boardId: any, column: any) {
    this.boardsService
      .createTask({
        id: Date.now(),
        description: this.form.value.description as string,
        color: color as string,
        type: type as string,
        creationDate: Date.now(),
        boardId: boardId as string,
      }).subscribe();
  }

  onDeleteTask(itemId: number | string) {
    this.boardsService.deleteTask(itemId).subscribe(() => {
      this.tasks = this.tasks.filter((item) => item.id !== itemId);
    });
  }

  onDeleteComment(commentId: number | string) {
    return this.boardsService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter((item) => item.id !== commentId);
    });
  }
}
