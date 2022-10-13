import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
