import { Component } from '@angular/core';
import { BackendService } from './shared/backend.service';

@Component({
  selector: 'jj-root',
  template: ` <h1 class="app-toolbar">TICKET ONLINE</h1>
        <router-outlet></router-outlet>`,
})
export class AppComponent {
  tickets = this.backend.tickets();
  users = this.backend.users();

  constructor(private backend: BackendService) {}
}
