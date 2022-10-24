import { EditComponent } from './feature/components/edit/edit.component';
import { ErrorComponent } from './core/components/error/error.component';
import { BoardsComponent } from './feature/components/boards/boards.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './feature/components/details/details.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegistrationComponent } from './core/components/registration/registration.component';
import { BoardComponent } from './feature/components/board/board.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'boards', component: BoardsComponent },
  { path: 'boards/board/details/:id', component: DetailsComponent },
  { path: 'boards/board/edit/:id', component: EditComponent },
  { path: 'boards/board/:id', component: BoardComponent },
  { path: '', redirectTo: 'registration', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
