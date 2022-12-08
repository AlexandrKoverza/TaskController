import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { BoardsService } from 'src/app/services/boards.service';
import { Board } from '../../../models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
  board$: Observable<Board | null> = EMPTY;

  constructor(
    public activatedRoute: ActivatedRoute,
    public boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.board$ = this.boardsService.getBoard$();
    this.showBoard();

    this.activatedRoute.paramMap.subscribe((params: ParamMap) =>
      this.boardsService.getBoard(params.get('id')!)
    );
  }

  showBoard() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.boardsService.updateBoardInfo(params['id']);
    });
  }
}
