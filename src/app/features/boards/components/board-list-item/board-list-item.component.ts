import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from '../../../../models';

@Component({
  selector: 'app-board-list-item',
  templateUrl: './board-list-item.component.html',
  styleUrls: ['./board-list-item.component.scss'],
})
export class BoardListItemComponent {
  @Input() board: Board  = {} as Board;
  @Output() delete = new EventEmitter<string>();

  deleteBoard() {
    this.delete.emit(this.board.id);
  }
}


