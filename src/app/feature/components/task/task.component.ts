import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  @Input() item: any;
  @Output() emitText: EventEmitter<{ id: number; text: string }> =
    new EventEmitter();
  @Output() emitDeleteItem: EventEmitter<number> = new EventEmitter();

  commentInput = '';
  open = false;

  constructor() {}

  ngOnInit(): void {}

  onCommentTextEmit(id: number) {
    this.emitText.emit({id, text: this.commentInput})
    this.commentInput = ''
  }

  onItemDelete(id: number) {
    this.emitDeleteItem.emit(id)
  }
}
