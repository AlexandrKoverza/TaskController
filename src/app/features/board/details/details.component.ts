import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { BoardsService } from 'src/app/services/boards.service';
import { Board } from '../../../models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {
  board$: Observable<Board> = EMPTY;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public boardsService: BoardsService
  ) {
  }

  ngOnInit(): void {
    this.board$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.boardsService.getBoard(params.get('id')!)
      )
    );
  }

  back() {
    this.router.navigate(['/']);
  }
}
