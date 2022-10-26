import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';

@NgModule({
  declarations: [
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
  ],
  exports: [DetailsComponent]
})
export class DetailsModule { }