import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  boards = this.boardsService.boards

  constructor(
    private router: Router,
    public modalService: ModalService,
    public boardsService: BoardsService
  ) {}

  ngOnInit(): void {
  }

  toBoard(id: number | string) {
    this.router.navigate(['boards/board', id]);
  }

  detailsBoard(id: number | string) {
    this.router.navigate(['boards/board/details', id]);
  }

  updateBoard(id: number | string) {
    this.router.navigate(['boards/board/edit', id]);
  }

  deleteBoard(id: number | string) {
    this.boardsService.boards = this.boardsService.boards.filter(item => item.id !== id);
  }
}
