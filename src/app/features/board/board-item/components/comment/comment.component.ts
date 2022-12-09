import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IComment } from "../../../../../models/comment";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input() comment: IComment = {} as IComment;
  @Output() emitComment: EventEmitter<IComment> = new EventEmitter();

  onCommentEmit(comment: IComment) {
    this.emitComment.emit(comment);
  }
}
