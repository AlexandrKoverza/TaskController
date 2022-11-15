import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(public modalService: ModalService) {}
}
