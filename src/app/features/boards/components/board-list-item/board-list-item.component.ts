import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from '../../../../models';

@Component({
  selector: 'app-board-list-item',
  templateUrl: './board-list-item.component.html',
  styleUrls: ['./board-list-item.component.scss'],
})
export class BoardListItemComponent {
  @Input() board!: Board;

  @Output() showBoard = new EventEmitter<string>();
  @Output() details = new EventEmitter<string>();
  @Output() update = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  toBoard() {
    this.showBoard.emit(this.board.id);
  }

  detailsBoard() {
    this.details.emit(this.board.id);
  }

  updateBoard() {
    this.update.emit(this.board.id)
  }

  deleteBoard() {
    this.delete.emit(this.board.id);
  }
}


