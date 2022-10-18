import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from 'src/app/mock-data/boards';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  boards: Board[] = [];
  boardId: any;
  board: any;  

  constructor(
    public boardsService: BoardsService,
    public route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id');
    this.board = this.boardsService.getBoardById(this.boardId);
  }

  back() {
    this.router.navigate(['/boards']);
  }

  deleteBoard(id: number | string) {
    return this.boardsService.deleteItem(id).subscribe(() => {
      this.boards = this.boards.filter(item => item.id !==id)
      this.router.navigate(['/boards']);
    })
  }
}
