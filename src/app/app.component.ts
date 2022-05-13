import { Component } from '@angular/core';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
})
export class AppComponent {
  tickets = this.backend.tickets();
  users = this.backend.users();

  constructor(private backend: BackendService) {}
}
