import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Board } from 'src/app/mock-data/boards';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  board$: Observable<Board> | undefined;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.board$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.boardsService.getBoard(params.get('id')!)
      )
    );
  }

  back() {
    this.router.navigate(['/boards']);
  }
}
