import { DetailsComponent } from './components/details/details.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './components/boards/boards.component';
import { EditComponent } from './components/edit/edit.component';
import { PopupComponent } from './components/popup/popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipePipe } from '../pipes/search-pipe.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CoreModule } from '../core/core.module';
import { TaskComponent } from './components/task/task.component';
import { BoardComponent } from './components/board/board.component';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [
    DetailsComponent,
    BoardsComponent,
    EditComponent,
    PopupComponent,
    SearchPipePipe,
    BoardComponent,
    TaskComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    CoreModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [DetailsComponent, BoardsComponent, EditComponent, PopupComponent, TaskComponent],
})
export class HomeModule {}
