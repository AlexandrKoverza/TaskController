import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from 'src/app/mock-data/boards';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  boardId: any;
  board: any;
  boards: Board[] = []

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id');
    this.board = this.boardsService.getBoardById(this.boardId);
  }
  back() {
    this.router.navigate(['/boards']);
  }
}
