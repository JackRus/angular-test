import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { watchRouteParam } from 'src/app/shared/tools/router-helpers';
import { TicketsFacade } from '../store/tickets.facade';
import { Ticket } from '../store/tickets.models';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html'
})
export class TicketDetailsComponent implements OnInit, OnDestroy {

  private stop = new Subject();
  isLoaded$ = this.ticketService.selectedLoaded$;
  ticket: Ticket;

  form = new FormGroup({
    description: new FormControl(null, Validators.required),
    assigneeId: new FormControl(null),
    isCompleted: new FormControl(false),
    priority: new FormControl(null)
  })

  constructor (private ticketService: TicketsFacade, private router: Router){
  }

  ngOnInit(): void {
    watchRouteParam<number>('id', this.router)
      .pipe(takeUntil(this.stop))
      .subscribe((id) => this.ticketService.getTicketById(id));

    this.ticketService.selectedTicket$
      .pipe(takeUntil(this.stop))
      .subscribe(ticket => {
        this.ticket = ticket;
        this.form.reset(ticket);
      });
  }

  setAssignee(assigneeId: number | null) {
    this.form.get('assigneeId').reset(assigneeId);
    this.form.markAsDirty();
  }

  update() {
    if (!this.form.valid) return;
    this.ticketService.updateTicket({
      ...this.ticket,
      ...this.form.value
    })
  }

  ngOnDestroy(): void {
      this.stop.next();
      this.stop.complete();
  }
}

