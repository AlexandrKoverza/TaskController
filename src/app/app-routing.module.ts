import { NotFoundComponent } from './features/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./features/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: '',
    loadChildren: () => import('./features/boards/boards.module').then(m => m.BoardsModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'board/:id',
    loadChildren: () => import('./features/board/board.module').then(m => m.BoardModule),
    canLoad: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
