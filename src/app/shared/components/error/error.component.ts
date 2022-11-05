import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  template: ` <div class="error">404 Error</div> `,
  styles: [`
  .error { 
    font-weight: bold; 
    margin: 0 auto; 
    font-size: 34px;
    border: 1px solid #bebebe;
    padding: 15px;
    width: fit-content;
    margin-top: 15px;
  }
  `],
})
export class ErrorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}