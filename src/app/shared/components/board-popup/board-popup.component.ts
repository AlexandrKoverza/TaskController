import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoardsService, ModalService } from '../../../services';

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

  submit() {
    this.boardsService
      .createBoard({
        id: String(Date.now()),
        name: this.form.value.name as string,
        description: this.form.value.description as string,
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
