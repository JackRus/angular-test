import { Component } from '@angular/core';
import { BackendService } from './backend.service';

@Component({
  selector: 'jj-root',
  template: ` <div class="app-toolbar">TICKET ONLINE</div>
        <router-outlet></router-outlet>`,
})
export class AppComponent {
  tickets = this.backend.tickets();
  users = this.backend.users();

  constructor(private backend: BackendService) {}
}
