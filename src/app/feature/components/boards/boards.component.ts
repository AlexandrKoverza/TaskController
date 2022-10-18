import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() clickEmitter = new EventEmitter();
  searchText: string = ''
  boards: Board[] = []
  name: any

  constructor(
    private router: Router,
    public modalService: ModalService,
    public boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.boardsService.getBoards().subscribe((response) => {
      this.boards = response
    })
  }

  toBoard(id: number | string) {
    this.router.navigate(['boards/board', id]);
  }

  detailsBoard(id: number | string) {
    this.router.navigate(['boards/board/details', id]);
  }

  updateBoard(board: Board) {
    this.router.navigate(['boards/board/edit', board.id]);
    return this.boardsService.updateItem(board)
  }

  deleteBoard(id: number | string) {
    return this.boardsService.deleteItem(id).subscribe(() => {
      this.boards = this.boards.filter(item => item.id !==id)
    })
  }
}
