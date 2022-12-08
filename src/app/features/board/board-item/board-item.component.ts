import { ChangeDetectorRef, Component,  OnInit } from "@angular/core";
import { ActivatedRoute,  Params, Router } from "@angular/router";
import { EMPTY, Observable } from "rxjs";
import { BoardsService } from "src/app/services/boards.service";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { FormBuilder, Validators } from "@angular/forms";
import { boardColumns } from "src/app/constants/board-columns";
import { BoardColumn } from "src/app/models/board-column";
import { Board } from "../../../models";

@Component({
  selector: "app-board-item",
  templateUrl: "./board-item.component.html",
  styleUrls: ["./board-item.component.scss"]
})
export class BoardItemComponent implements OnInit {
  boardColumns: BoardColumn[] = [...boardColumns];

  board$: Observable<Board | null> = EMPTY;

  boards: any[] = [];

  tasks: any[] = []

  form = this.formBuilder.group({
    description: ["", Validators.required]
  });

  constructor(
    private boardsService: BoardsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private changeDetectionRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.board$ = this.boardsService.getBoard$();
    this.showBoard();
  }

  showBoard() {
    this.activatedRoute.params
        .subscribe((params: Params) => {
          this.boardsService.updateBoardInfo(params["id"]);
        });
    // this.changeDetectionRef.markForCheck()
  }

  deleteBoard(id: number | string) {
    return this.boardsService.deleteBoard(id).subscribe(() => {
      this.boards = this.boards.filter((item) => item.id !== id);
      this.router.navigate(["/"]);
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
          boardId: boardId
        }).subscribe(() => {
      this.showBoard();
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

  drop(event: CdkDragDrop<any>) {
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
