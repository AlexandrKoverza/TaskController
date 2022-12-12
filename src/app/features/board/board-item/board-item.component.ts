import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { BoardsService } from 'src/app/services/boards.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder, Validators } from '@angular/forms';
import { boardColumns } from 'src/app/constants/board-columns';
import { BoardColumn } from 'src/app/models/board-column';
import { Board } from '../../../models';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  boardColumns: BoardColumn[] = [...boardColumns];
  board$: Observable<Board | null> = EMPTY;
  boards: any[] = [];
  tasks: any[] = [];

  form = this.formBuilder.group({
    description: ['', Validators.required],
  });

  constructor(
    private boardsService: BoardsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
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

  deleteBoard(id: number | string) {
    return this.boardsService.deleteBoard(id).subscribe(() => {
      this.boards = this.boards.filter((item) => item.id !== id);
      this.router.navigate(['/']);
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
