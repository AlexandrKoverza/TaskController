import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { BoardsService } from 'src/app/services/boards.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Board } from '../../../models';
import { COLUMN_MAPPER } from '../../../constants/board-columns';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  boards: Board[] = [];
  board$: Observable<Board> = EMPTY;
  form!: FormGroup;

  columnMapper = COLUMN_MAPPER;

  constructor(
    private boardsService: BoardsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
  }

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

  addTask(columnId: number) {
    const newCard = {
      id: Date.now(),
      text: this.form.value.text,
      creationData: Date.now(),
      board_id: columnId,
      comments: []
    }
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

  sortStartA(list: any) {
    return list.sort((a: any, b: any) => (a.text > b.text ? -1 : 1));
  }

  sortStartZ(list: any) {
    return list.sort((a: any, b: any) => (a.text > b.text ? 1 : -1));
  }

  sortUp(list: any) {
    return list.sort((a: any, b: any) => (a.text > b.text ? 1 : -1));
  }

  sortDown(list: any) {
    return list.sort((a: any, b: any) => (a.text > b.text ? -1 : 1));
  }

}
