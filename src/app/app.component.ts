import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  token$ = new BehaviorSubject(localStorage.getItem('userEmail'))

  constructor(public modalService: ModalService) {
  }

  ngOnInit() {
    this.token$.asObservable()
  }
}
