import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as TicketsActions from './tickets.actions';
import { Ticket, TicketFilterOption } from './tickets.models';
import * as TicketsSelectors from './tickets.selectors';

@Injectable()
export class TicketsFacade {

    loaded$ = this.store.pipe(select(TicketsSelectors.getTicketsLoaded));
    filteredTickets$ = this.store.pipe(select(TicketsSelectors.getFilteredTickets));
    allTickets$ = this.store.pipe(select(TicketsSelectors.getAllTickets));
    selectedTicket$ = this.store.pipe(select(TicketsSelectors.getSelected));
    activeFilter$ = this.store.pipe(select(TicketsSelectors.getActiveFilter));
    assignees$ = this.store.pipe(select(TicketsSelectors.getAssignees));
    selectedLoaded$ = this.store.pipe(select(TicketsSelectors.getSelectedLoaded));
    ticketsCount$ = this.store.pipe(select(TicketsSelectors.getTicketsCount));

    constructor(private readonly store: Store) {
        this.init();
    }

    init() {
        this.store.dispatch(TicketsActions.getTickets());
        this.store.dispatch(TicketsActions.getAssignees());
    }

    addTicket(description: string, assigneeId: number) {
        this.store.dispatch(TicketsActions.addTicket({description, assigneeId}));
    }

    markAsCompleted(ticket: Ticket){
        this.store.dispatch(TicketsActions.markAsCompleted({ id: ticket.id, complete: !ticket.isCompleted }))
    }

    changeFilter(option: TicketFilterOption) {
        this.store.dispatch(TicketsActions.changeFilter({ filter: option }));
    }

    assignTicket(ticketId: number, assigneeId: number | null) {
        this.store.dispatch(TicketsActions.assignTicket({ ticketId, assigneeId }));
    }

    getTicketById(id: number | undefined) {
        this.store.dispatch(TicketsActions.getTicketById({ id }));
    }

    selectTicket(id: number | undefined) {
        this.store.dispatch(TicketsActions.selectTicket({ ticketId: id }));
    }

    updateTicket(ticket: Ticket) {
        this.store.dispatch(TicketsActions.updateTicket({ ticket }));
    }
}
