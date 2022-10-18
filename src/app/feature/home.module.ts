import { DetailsComponent } from './components/details/details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './components/boards/boards.component';
import { EditComponent } from './components/edit/edit.component';
import { PopupComponent } from './components/popup/popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipePipe } from '../pipes/search-pipe.pipe';
import { BoardComponent } from './components/boards/components/board/board.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    DetailsComponent,
    BoardsComponent,
    EditComponent,
    PopupComponent,
    SearchPipePipe,
    BoardComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [DetailsComponent, BoardsComponent, EditComponent, PopupComponent],
})
export class HomeModule {}
