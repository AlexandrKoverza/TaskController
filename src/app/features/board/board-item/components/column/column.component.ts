import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { boardColumns } from 'src/app/constants/board-columns';
import { Board } from 'src/app/models';
import { BoardColumn } from 'src/app/models/board-column';
import { BoardsService } from 'src/app/services';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent implements OnInit {
  @Input() board: any;
  @Input() column: any;

  filterName: string | undefined;

  boardColumns: BoardColumn[] = [...boardColumns];
  board$: Observable<Board | null> = EMPTY;
  boards: any[] = [];

  form = this.formBuilder.group({
    description: ['', Validators.required],
  });

  constructor(
    private boardsService: BoardsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.board$ = this.boardsService.getBoard$();
    this.showBoard();
  }

  showBoard() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.boardsService.updateBoardInfo(params['id']);
    });
  }

  addTask(type: string, color: string, boardId: string, column: any) {
    this.boardsService
      .createTask({
        id: Date.now(),
        description: this.form.value.description,
        color: color,
        type: type,
        creationDate: Date.now(),
        boardId: boardId,
      })
      .subscribe(() => {
        this.showBoard();
        this.filterName = '';
      });
  }

  onDeleteTask(itemId: number) {
    this.boardsService.deleteTask(itemId).subscribe(() => {
      this.boards = this.boards.filter((item) => item.id !== itemId);
      this.showBoard();
    });
  }

  onDeleteComment(commentId: number) {
    return this.boardsService.deleteComment(commentId).subscribe(() => {
      this.boards = this.boards.filter((item) => item.id !== commentId);
      this.showBoard();
    });
  }
}
