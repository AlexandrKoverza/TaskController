import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BoardPopupComponent } from './components/board-popup/board-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';

const components = [
  HeaderComponent,
  FooterComponent,
  BoardPopupComponent
];

const pipes = [
  SearchPipe
];

@NgModule({
  declarations: [...components, ...pipes],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [...components, ...pipes]
})
export class SharedModule {
}
