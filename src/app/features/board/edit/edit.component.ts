import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { BoardsService } from 'src/app/services/boards.service';
import { Board } from '../../../models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements OnInit {
  boards: Board[] = [];
  board: any;
  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public boardsService: BoardsService,
    private formBuilder: FormBuilder,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.board = this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          return this.boardsService.getBoard(params['id']);
        })
      )
      .subscribe((board: Board) => {
        this.showBoards()
        this.board.id = board.id;
        this.form = this.formBuilder.group({
          name: [board.name, Validators.required],
          description: [board.description, Validators.required],
        });
        this.board.creationDate = board.creationDate;
      });
  }

  showBoards() {
    this.boardsService.getBoards().subscribe((boards) => {
      this.boards = boards
      this.changeDetectionRef.markForCheck()
    })
  }

  saveBoard() {
    return this.boardsService
      .updateBoard({
        id: this.board.id,
        name: this.form.value.name,
        description: this.form.value.description,
        column: this.board.column,
        creationDate: this.board.creationDate,
      })
      .subscribe(() => this.router.navigate(['/boards']));
  }
}
