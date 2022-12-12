import { CommentComponent } from './components/comment/comment.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardItemComponent } from './board-item.component';
import { TaskComponent } from './components/task/task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { ColumnComponent } from './components/column/column.component';

@NgModule({
  declarations: [
    BoardItemComponent,
    TaskComponent,
    CommentComponent,
    ColumnComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    RouterModule
  ],
  exports: [BoardItemComponent, TaskComponent, CommentComponent, ColumnComponent]
})
export class BoardItemModule {
}
