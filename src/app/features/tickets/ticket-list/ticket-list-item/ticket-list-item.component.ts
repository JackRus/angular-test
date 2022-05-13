import { Component, Input, OnInit } from '@angular/core';
import { TicketsFacade } from '../../store/tickets.facade';
import { Ticket } from '../../store/tickets.models';

@Component({
    selector: "jj-ticket-list-item",
    templateUrl: "./ticket-list-item.component.html",
})
export class TicketListItemComponent {

    @Input() ticket!: Ticket;

    constructor(private ticketService: TicketsFacade) {}

    complete() {
      this.ticketService.markAsCompleted(this.ticket);
    }

    assign(assigneeId: number) {
      this.ticketService.assignTicket(this.ticket.id, assigneeId);
    }
}
