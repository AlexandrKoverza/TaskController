import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  userName = localStorage.getItem('userEmail');

  exit() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    this.router.navigate(['/login']);
  }
}
