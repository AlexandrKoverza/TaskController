import {
  ChangeDetectionStrategy,
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  @Input() item: any;
  @Output() emitText: EventEmitter<{ id: number; text: string }> = new EventEmitter();
  @Output() emitDeleteItem: EventEmitter<number> = new EventEmitter();
  form: any;

  constructor(private formBuilder: FormBuilder, private boardService: BoardService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: this.item.id,
      text: [this.item.text, Validators.required],
      creationData: this.item.creationData,
      comments: [...this.item.comments]
    });
  }

  commentInput = '';
  open = false;
  edit = false;

  onCommentTextEmit(id: number) {
    this.emitText.emit({id, text: this.commentInput})
    this.commentInput = ''
  }

  onItemDelete(id: number) {
    this.emitDeleteItem.emit(id)
  }

  editCard() {
    this.edit = !this.edit
  }

  updateCardText(item: any) {
    this.boardService.updateCard({
      id: item.id,
      text: this.form.value.text,
      creationData: item.creationData,
      comments: [...item.comments]
    })
    this.edit = false;
  }
}
