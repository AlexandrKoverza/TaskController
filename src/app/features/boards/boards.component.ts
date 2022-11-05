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

  constructor(
    private router: Router,
    public modalService: ModalService,
    public boardsService: BoardsService
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

  // todo: add sorting pipe with params!!
  sortStartA(board: any) {
    return board.sort((a: any, b: any) => (a.name > b.name ? -1 : 1));
  }

  // todo: add sorting pipe with params!!
  sortStartZ(board: any) {
    return board.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
  }

  // todo: add sorting pipe with params!!
  sortUp(board: any) {
    return board.sort((a: any, b: any) =>
      a.column.length > b.column.length ? -1 : 1
    );
  }

  // todo: add sorting pipe with params!!
  sortDown(board: any) {
    return board.sort((a: any, b: any) =>
      a.column.length > b.column.length ? 1 : -1
    );
  }
}
