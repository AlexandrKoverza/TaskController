import { ErrorComponent } from './feature/components/error/error.component';
import { BoardsComponent } from './feature/components/boards/boards.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./feature/components/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./feature/components/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'boards/board/details/:id',
    loadChildren: () =>
      import('./feature/components/details/details.module').then(
        (m) => m.DetailsModule
      ),
  },
  {
    path: 'boards/board/edit/:id',
    loadChildren: () =>
      import('./feature/components/edit/edit.module').then((m) => m.EditModule),
  },
  {
    path: 'boards/board/:id',
    loadChildren: () =>
      import('./feature/components/board/board.module').then(
        (m) => m.BoardModule
      ),
  },
  { path: 'boards', component: BoardsComponent },
  { path: 'boards', component: HeaderComponent, data: { show: true } },
  { path: 'boards', component: FooterComponent, data: { show: false } },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
