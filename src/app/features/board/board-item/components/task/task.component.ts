import {
  ChangeDetectionStrategy,
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  ChangeDetectorRef
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { EMPTY, Observable } from "rxjs";
import { Board } from "src/app/models";
import { BoardsService } from "src/app/services";
import { IComment } from "../../../../../models/comment";
import { ITask } from "../../../../../models/task";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit {
  boards: Board[] = [];

  board$: Observable<Board | null> = EMPTY;

  @Input() task!: ITask;

  @Input() comments?: IComment[] = [];
  @Output() emitText: EventEmitter<{ taskId: number | string; text: number | string }> =
    new EventEmitter();
  @Output() emitDeleteItem: EventEmitter<number> = new EventEmitter();

  comment = this.formBuilder.group({
    text: ["", Validators.required]
  });
  form = this.formBuilder.group({
    description: ["", Validators.required]
  });
  commentInput = "";
  open = false;
  edit = false;

  constructor(
    private formBuilder: FormBuilder,
    private boardsService: BoardsService,
    private changeDetectionRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.board$ = this.boardsService.getBoard$();
    this.comment = this.formBuilder.group({
      text: [this.task.description, Validators.required]
    });
    this.form = this.formBuilder.group({
      description: [this.task.description, Validators.required]
    });
  }

  showBoard() {
    this.activatedRoute.params
        .subscribe((params: Params) => {
          this.boardsService.updateBoardInfo(params["id"]);
        });
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
      this.showBoard();
    });
    this.emitText.emit({ taskId, text: this.commentInput });
    this.commentInput = "";
  }

  editCard() {
    this.edit = !this.edit;
  }

  updateTaskDescription(item: ITask) {
    this.boardsService.updateTask({
      ...item,
      description: this.form.value.description
    }).subscribe(() => {
      this.edit = false;
      this.showBoard();
    });
  }

  calculateComments(comments: IComment[] | undefined, taskId: number): number {
    return comments ?
      comments.filter(com => com.taskId === taskId).length
      : 0;
  }
}
