import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { BoardsService } from 'src/app/services/boards.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Board } from '../../../models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  boards: Board[] = [];
  board$: Observable<Board> = EMPTY;
  form!: FormGroup;

  constructor(
    private boardsService: BoardsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.board$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.boardsService.getBoard(params.get('id')!)
      )
    );
    this.form = this.formBuilder.group({
      text: ['', Validators.required],
    });
  }

  back() {
    this.router.navigate(['/']);
  }

  addTask(boardId: any, columnId: any) {
    const newCard = {
      id: Date.now(),
      text: this.form.value.text,
      creationData: Date.now(),
      comments: [],
    };

    const link = `http://localhost:3000/boards/${boardId}`;


    // todo: call updateBoard method from boardsService or think about logic
    // this.boardService.createCard(newCard, columnId)
  }

  deleteBoard(id: number | string) {
    return this.boardsService.deleteBoard(id).subscribe(() => {
      this.boards = this.boards.filter((item) => item.id !== id);
      this.router.navigate(['/']);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
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

  onAddComment(event: { id: number; text: string }, columnId: number) {
    // todo: call updateBoard method from boardsService
    // this.boardService.addComment(columnId, event.id, event.text);
  }

  onDeleteComment(comment: any, columnId: any, item: any) {
    // todo: call updateBoard method from boardsService
    // this.boardService.deleteComment(columnId, item.id, comment.id);
  }

  onDeleteItem(itemId: number, columnId: number) {
    // todo: call updateBoard method from boardsService
    // this.boardService.deleteItem(itemId, columnId);
  }

}
