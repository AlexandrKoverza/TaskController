import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/app/mock-data/boards';
import { BoardsService } from 'src/app/services/boards.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  searchText: string = '';
  boards: Board[] = [];
  boards$: Observable<Board[]> = of([])

  constructor(
    private router: Router,
    public modalService: ModalService,
    public boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.boards$ = this.boardsService.getBoards()
    console.log();
    
  }

  toBoard(id: number | string) {
    this.router.navigate(['boards/board', id]);
  }

  detailsBoard(id: number | string) {
    this.router.navigate(['boards/board/details', id]);
  }

  updateBoard(board: Board) {
    this.router.navigate(['boards/board/edit', board.id]);
    return this.boardsService.updateItem(board);
  }

  deleteBoard(id: any) {
    this.boardsService.deleteItem(id).subscribe(() => {
      this.boards = this.boards.filter((item) => item.id !== id);      
    });
    // return this.boards$ = this.boardsService.getBoards()
  }

  sortStartA(board: any) {  
    return board.sort((a: any, b: any) => (a.name > b.name ? -1 : 1));
  }

  sortStartZ(board: any) {
    return board.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
  }

  sortUp(board: any) {
    return board.sort((a: any, b: any) => (a.column.length > b.column.length ? -1 : 1));
  }

  sortDown(board: any) {
    return board.sort((a: any, b: any) => (a.column.length > b.column.length ? 1 : -1));
  }
}
