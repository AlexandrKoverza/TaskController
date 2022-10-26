import { CommentComponent } from './../comment/comment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { TaskComponent } from '../task/task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    BoardComponent,
    TaskComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  exports: [BoardComponent, TaskComponent, CommentComponent]
})
export class BoardModule { }