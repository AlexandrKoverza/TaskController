import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  token$ = new BehaviorSubject(localStorage.getItem('userEmail'))

  constructor(public modalService: ModalService) {
  }

  ngOnInit() {
    this.token$.asObservable()
  }
}
