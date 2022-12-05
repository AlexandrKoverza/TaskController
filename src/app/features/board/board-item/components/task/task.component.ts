import {
  ChangeDetectionStrategy,
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { Board } from 'src/app/models';
import { BoardsService } from 'src/app/services';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  boards: Board[] = [];

  @Input() item: any;
  @Output() emitText: EventEmitter<{ taskId: number | string; text: number | string }> =
    new EventEmitter();
  @Output() emitDeleteItem: EventEmitter<number> = new EventEmitter();
  
  comment = this.formBuilder.group({
    text: ['', Validators.required],
  });
  form = this.formBuilder.group({
    description: ['', Validators.required],
  });
  commentInput = '';
  open = false;
  edit = false;

  constructor(
    private formBuilder: FormBuilder,
    private boardsService: BoardsService,
    private changeDetectionRef: ChangeDetectorRef

  ) {}

  ngOnInit() {
    this.showBoards()
    this.comment = this.formBuilder.group({
      text: [this.item.text, Validators.required],
    });
    this.form = this.formBuilder.group({
      description: [this.item.description, Validators.required],
    });
  }

  showBoards() {
    this.boardsService.getBoards().subscribe((boards) => {
      this.boards = boards
      this.changeDetectionRef.markForCheck()
    })
  }

  onItemDelete(id: number) {
    this.emitDeleteItem.emit(id);
  }

  onAddComment(taskId: number | string, boardId: number | string) {
    this.boardsService.createComment({
      id: Date.now(),
      text: this.comment.value.text as string,
      boardId: boardId as string,
      taskId: taskId as string
    }).subscribe(() => {
      this.showBoards()
    });
    this.emitText.emit({ taskId, text: this.commentInput });
    this.commentInput = '';
  }

  editCard() {
    this.edit = !this.edit;
  }

  updateTaskDescription(item: any) {
    this.boardsService.updateTask({
      ...item,
      description: this.form.value.description,
    }).subscribe(() => {
      this.edit = false;
    })
  }
}
