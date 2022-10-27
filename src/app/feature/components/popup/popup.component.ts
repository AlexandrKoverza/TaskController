import { BoardsService } from './../../../services/boards.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { v4 as uuid } from 'uuid';
import { Observable, of } from 'rxjs';
import { Board } from 'src/app/mock-data/boards';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent implements OnInit {
  @Input() name: string | undefined;
  @Input() description: string | undefined;
  boards$: Observable<Board[]> = of([]);

  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    public modalService: ModalService,
    public boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.boards$ = this.boardsService.getBoards();
  }

  submit() {
    this.boardsService.createBoard({
        id: uuid(),
        name: this.form.value.name as string,
        description: this.form.value.description as string,
        column: [
          {
            id: 1,
            title: "To Do",
            color: "#CECF9C",
            list: []
          },
          {
            id: 2,
            title: "Progress",
            color: "#FFCF9C",
            list: []
          },
          {
            id: 3,
            title: "Done",
            color: "#31CF63",
            list: []
          },
        ],
        creationDate: Date.now(),
      })
      .subscribe(() => {
        this.modalService.close();
      });
  }

  get names() {
    return this.form.controls.name as FormControl;
  }

  get descriptions() {
    return this.form.controls.description as FormControl;
  }
}
