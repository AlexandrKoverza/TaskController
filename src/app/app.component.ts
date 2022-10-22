import { HeaderService } from './services/header.service';
import { Component } from '@angular/core';
import { ModalService } from './services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Task Controller';

  constructor(
    public modalService: ModalService,
  ) {}

}
