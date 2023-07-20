import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-menu *ngIf="url !== '/login'"></app-menu>
    <router-outlet></router-outlet>`,
})
export class AppComponent {
  url!: string;

  constructor() {
    this.url = window.location.pathname;
  }
}
