import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Board } from 'src/app/mock-data/boards';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements OnInit {
  @Input() name?: string;
  @Input() description?: string;

  form: any;
  board: any;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public boardsService: BoardsService,
    private formBuilder: FormBuilder,
  ) {}

  back() {
    this.router.navigate(['/boards']);
  }

  ngOnInit(): void {
    this.board = this.activatedRoute.params
    .pipe(
      switchMap((params: Params) => {
        return this.boardsService.getBoard(params['id']);
      })
    )
    .subscribe((board: Board) => {
      this.board.id = board.id
      this.form = this.formBuilder.group({
        name: [board.name, Validators.required],
        description: [board.description, Validators.required],
      });
      this.board.column = board.column
      this.board.creationDate = board.creationDate
    });
  }

  saveBoard() {
    return this.boardsService.updateItem({
        id: this.board.id,
        name: this.form.value.name,
        description: this.form.value.description,
        column: this.board.column,
        creationDate: this.board.creationDate,
      })
      .subscribe(() => this.router.navigate(['/boards']));
  }

  get editNames() {
    return this.form.controls.name as FormControl;
  }

  get editDescriptions() {
    return this.form.controls.description as FormControl;
  }
}
