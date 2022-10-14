import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input() name: string | undefined;
  @Input() description: string | undefined;

  boardId: any
  board: any
  form: any

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id');
    this.board = this.boardsService.getBoardById(this.boardId);

    this.form = new FormGroup({
      id: new FormControl(this.board.id),
      name: new FormControl<string>(this.board.name, [
        Validators.required,
        Validators.minLength(10),
      ]),
      description: new FormControl<string>(this.board.description, [
        Validators.required,
        Validators.minLength(100),
      ]),
      tasks: new FormControl(this.board.tasks),
      creationDate: new FormControl(this.board.creationDate)
    });
  }
  
  saveBoard() {
    return this.boardsService.updateItem({
      id: this.board.id,
      name: this.form.value.name,
      description: this.form.value.description,
      tasks: this.board.tasks,
      creationDate: this.board.creationDate
    }).subscribe(() => this.router.navigate(['boards']))
    
  }

  get editNames() {
    return this.form.controls.name as FormControl;
  }

  get editDescriptions() {
    return this.form.controls.description as FormControl;
  }
}
