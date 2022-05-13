import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/shared/backend.service';
import * as TicketsActions from './tickets.actions';
import { Ticket, TicketFilterOption } from './tickets.models';

export const TICKETS_FEATURE_KEY = 'tickets';

export interface TicketsState extends EntityState<Ticket> {
    selectedId?: string | number;
    loaded: boolean;
    error?: string | null;
    ticketDetails: Ticket | undefined;
    assignees: User[];
    isSelectedLoaded: boolean;
    activeFilter: TicketFilterOption
}

export interface TicketsPartialState {
    readonly [TICKETS_FEATURE_KEY]: TicketsState;
}

export const ticketsAdapter: EntityAdapter<Ticket> =
    createEntityAdapter<Ticket>();

export const initialState: TicketsState = ticketsAdapter.getInitialState({
    loaded: false,
    ticketDetails: undefined,
    assignees: [],
    activeFilter: TicketFilterOption.NotAssigned,
    isSelectedLoaded: false
});

const ticketsReducer = createReducer(

    initialState,
    on(TicketsActions.getTickets, (state) => ({
        ...state,
        loaded: false,
        error: null,
    })),
    on(TicketsActions.getTicketsSuccess, (state, { tickets }) =>
        ticketsAdapter.setAll(tickets, { ...state, loaded: true })
    ),

    on(TicketsActions.addTicket, (state) => ({
        ...state,
        loaded: false,
        error: null,
    })),

    on(TicketsActions.updateTicketSuccess, (state, { ticket }) =>
        ticketsAdapter.setOne(ticket, { ...state, loaded: true })
    ),

    on(TicketsActions.markAsCompleted, (state) => ({
        ...state,
        loaded: false,
        error: null,
    })),

    on(TicketsActions.getTicketById, (state) => ({
        ...state,
        isSelectedLoaded: false,
        error: null,
    })),
    on(TicketsActions.getTicketByIdSuccess, (state, { ticket }) => ({
        ...state,
        isSelectedLoaded: true,
        ticketDetails: ticket
    })),

    on(TicketsActions.changeFilter, (state, { filter }) => ({
        ...state,
        activeFilter: filter
    })),

    on(TicketsActions.getAssignees, (state) => ({
        ...state,
        loaded: false,
        error: null,
    })),
    on(TicketsActions.getAssigneesSuccess, (state, { assignees }) => ({
        ...state,
        assignees,
        loaded: true,
    })),

    on(TicketsActions.selectTicket, (state, { ticketId }) => ({
        ...state,
        selectedId: ticketId
    })),

    on(TicketsActions.apiFailure, (state, { error }) => ({
        ...state,
        error,
        loaded: true,
        isSelectedLoaded: true
    }))
);

export function reducer(state: TicketsState | undefined, action: Action) {
    return ticketsReducer(state, action);
}