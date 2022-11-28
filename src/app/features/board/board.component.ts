import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-board',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {}
