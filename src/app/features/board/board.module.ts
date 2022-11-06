import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { EditModule } from './edit/edit.module';
import { DetailsModule } from './details/details.module';
import { BoardItemModule } from './board-item/board-item.module';


@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    EditModule,
    DetailsModule,
    BoardItemModule
  ]
})
export class BoardModule { }
