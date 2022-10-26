import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './components/boards/boards.component';
import { PopupComponent } from './components/popup/popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipePipe } from '../pipes/search-pipe.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    BoardsComponent,
    PopupComponent,
    SearchPipePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ BoardsComponent, PopupComponent],
})
export class HomeModule {}
