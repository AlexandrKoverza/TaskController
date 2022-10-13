import { BoardComponent } from './feature/components/boards/components/board/board.component';
import { EditComponent } from './feature/components/edit/edit.component';
import { ErrorComponent } from './core/components/error/error.component';
import { BoardsComponent } from './feature/components/boards/boards.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './feature/components/details/details.component';

const routes: Routes = [
  { path: 'boards', component: BoardsComponent },
  { path: 'boards/board/details/:id', component: DetailsComponent },
  { path: 'boards/board/edit/:id', component: EditComponent },
  { path: 'boards/board/:id', component: BoardComponent },
  { path: '**', component: ErrorComponent },
  { path: '', redirectTo: 'boards', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
