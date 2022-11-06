import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input() comment: any;
  @Output() emitComment: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onCommentEmit(comment: any) {
    this.emitComment.emit(comment);
  }
}
