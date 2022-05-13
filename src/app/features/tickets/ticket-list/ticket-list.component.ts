import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TicketsFacade } from '../store/tickets.facade';
import { Ticket, TICKET_FILTERS, TicketFilterOption } from '../store/tickets.models';

@Component({
    selector: "jj-ticket-list",
    templateUrl: "./ticket-list.component.html"
})
export class TicketListComponent implements OnInit {

    activeFilter$ = this.ticketService.activeFilter$;
    tickets$!: Observable<Ticket[]>;
    emptyFilter$!: Observable<boolean>;
    isLoading$!: Observable<boolean>;

    readonly filters = TICKET_FILTERS;

    constructor(private ticketService: TicketsFacade) { }

    ngOnInit() {
        this.tickets$ = this.ticketService.filteredTickets$;

        this.emptyFilter$ = this.tickets$.pipe(map((ticlets) => !ticlets.length));

        this.isLoading$ = this.ticketService.allTickets$
            .pipe(map((tickets) => !tickets?.length));
    }

    changeFilter(option: TicketFilterOption) {
        this.ticketService.changeFilter(option);
    }
}
