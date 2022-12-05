import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { boardColumns } from 'src/app/constants/board-columns';
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
  @Output() update: EventEmitter<void> = new EventEmitter();

  form = this.formBuilder.group({
    description: ['', Validators.required],
  });

  constructor(
    private boardsService: BoardsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('sdfsdfsdf');
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
      })
      .subscribe(() => {
        this.update.emit();
      });
  }

  onDeleteTask(itemId: number | string) {
    this.boardsService.deleteTask(itemId).subscribe(() => {
      this.column = this.column.filter((item: { id: string | number; }) => item.id !== itemId);
      this.update.emit();
    });
  }

  onDeleteComment(commentId: number | string) {
    return this.boardsService.deleteComment(commentId).subscribe(() => {
      this.column = this.column.filter((item: { id: string | number; }) => item.id !== commentId);
      // this.showBoard();
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
}
