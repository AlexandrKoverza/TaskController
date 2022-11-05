import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BoardListItemComponent } from './components/board-list-item/board-list-item.component';


@NgModule({
  declarations: [
    BoardsComponent,
    BoardListItemComponent
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class BoardsModule { }
