import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { BoardsService, ModalService } from '../../../services';
import { BoardBase } from '../../../models';

@Component({
  selector: 'app-board-popup',
  templateUrl: './board-popup.component.html',
  styleUrls: ['./board-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPopupComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private boardsService: BoardsService
  ) {
  }

  // submit() {
  //   this.boardsService
  //     .createBoard(this.form.value as BoardBase)
  //     .pipe(take(1))
  //     .subscribe(() => this.closePopup());
  // }

  submit() {
    this.boardsService
      .createBoard({
        id: String(Date.now()),
        name: this.form.value.name as string,
        description: this.form.value.description as string,
        column: [
          {
            id: 1,
            title: 'To Do',
            color: '#CECF9C',
            list: [],
          },
          {
            id: 2,
            title: 'Progress',
            color: '#FFCF9C',
            list: [],
          },
          {
            id: 3,
            title: 'Done',
            color: '#31CF63',
            list: [],
          },
        ],
        creationDate: Date.now(),
      })
      .subscribe(() => {
        this.modalService.close();
      });
  }

  closePopup() {
    this.modalService.close();
  }

}
