import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: ` <div class="error">404 Error</div> `,
  styles: [
    `
      .error {
        font-weight: bold;
        margin: 0 auto;
        font-size: 34px;
        border: 1px solid #bebebe;
        padding: 15px;
        width: fit-content;
        margin-top: 15px;
      }
    `,
  ],
})
export class NotFoundComponent {}
