import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/backend.service';
import { Ticket, TicketFilterOption } from './tickets.models';

export const getTickets = createAction('[Tickets Page] Init');


export const getTicketsSuccess = createAction(
    '[Tickets] Get Tickets Success',
    props<{ tickets: Ticket[] }>()
);

export const getTicketById = createAction(
    '[Tickets] Get Ticket By Id',
    props<{ id: number | undefined }>()
);

export const getTicketByIdSuccess = createAction(
    '[Tickets] Get Ticket By Id Success',
    props<{ ticket: Ticket | undefined }>()
);

export const getAssignees = createAction('[Tickets] Get Assignees');

export const getAssigneesSuccess = createAction(
    '[Tickets] Get Assignees Success',
    props<{ assignees: User[] }>()
);

export const assignTicket = createAction(
    '[Tickets] Assign',
    props<{ ticketId: number, assigneeId: number | null }>()
);

export const updateTicketSuccess = createAction(
    '[Tickets] Update Ticket Success',
    props<{ ticket: Ticket }>()
);

export const addTicket = createAction(
    '[Tickets] Add Ticket',
    props<{ description: string, assigneeId?: number }>()
);

export const markAsCompleted = createAction(
    '[Tickets] Mark As Completed',
    props<{ id: number, complete: boolean }>()
);

export const changeFilter =  createAction(
    '[Tickets] Change Filter',
    props<{ filter: TicketFilterOption }>()
);

export const selectTicket = createAction(
    '[Tickets] Select Ticket',
    props<{ ticketId: number | undefined }>()
);

export const updateTicket = createAction(
    '[Tickets] Update Ticket',
    props<{ ticket: Ticket }>()
);


export const apiFailure = createAction(
    '[Tickets] Failure',
    props<{ error: any, source: string }>()
);
