import { Observable, of, take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from '../../models';
import { BoardsService, ModalService } from '../../services';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent {
  searchText: string = '';
  boards: Board[] = [];
  boards$: Observable<Board[]> = this.boardsService.getBoards();
  filterName: boolean = false
  filterTasks: boolean = false

  constructor(
    private router: Router,
    public modalService: ModalService,
    public boardsService: BoardsService,
  ) {}

  toBoard(id: string) {
    this.router.navigate(['/board', id]);
  }

  detailsBoard(id: string) {
    this.router.navigate(['/board', id, 'details']);
  }

  updateBoard(id: string) {
    this.router.navigate(['/board', id, 'edit']);
  }

  deleteBoard(id: string) {
    this.boardsService.deleteBoard(id).pipe(take(1)).subscribe(() => {
      this.boardsService.getBoards()
    });
  }

  changeName() {
    this.filterName = !this.filterName
  }

  changeTasks() {
    this.filterTasks = !this.filterTasks
  }
}
