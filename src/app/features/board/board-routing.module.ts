import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board.component';
import { AuthGuard } from '../../auth';
import { DetailsComponent } from './details/details.component';
import { BoardItemComponent } from './board-item/board-item.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'details', component: DetailsComponent },
          { path: 'edit', component: EditComponent },
          { path: '', component: BoardItemComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule {
}
