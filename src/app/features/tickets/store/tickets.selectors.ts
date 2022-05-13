import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Ticket } from './tickets.models';
import { TICKETS_FEATURE_KEY, ticketsAdapter, TicketsState } from './tickets.reducer';
import { filterTickets } from '../helpers/tickets-filter';

// Lookup the 'Tickets' feature state managed by NgRx
export const getTicketsState = createFeatureSelector<TicketsState>(TICKETS_FEATURE_KEY);

const { selectAll, selectEntities } = ticketsAdapter.getSelectors();

export const getTicketsLoaded = createSelector(
    getTicketsState,
    (state: TicketsState) => state.loaded
);

export const getTicketsError = createSelector(
    getTicketsState,
    (state: TicketsState) => state.error
);

export const getAllTickets = createSelector(getTicketsState, (state: TicketsState) =>
    selectAll(state)
);

export const getFilteredTickets = createSelector(
    getTicketsState,
    getAllTickets,
    (state, tickets: Ticket[]) => filterTickets(tickets, state.activeFilter)
);

export const getActiveFilter = createSelector(
    getTicketsState,
    (state: TicketsState) => state.activeFilter
);

export const getAssignees = createSelector(
    getTicketsState,
    (state: TicketsState) => state.assignees
);

export const getTicketsEntities = createSelector(
    getTicketsState,
    (state: TicketsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
    getTicketsState,
    (state: TicketsState) => state.selectedId
);

export const getSelected = createSelector(
    getTicketsEntities,
    getSelectedId,
    (entities, selectedId) => (selectedId || selectedId === 0 ? entities[selectedId] : undefined)
);

export const getSelectedLoaded = createSelector(
    getTicketsState,
    (state: TicketsState) => state.isSelectedLoaded
);

export const getTicketsCount = createSelector(
    getAllTickets,
    (tickets: Ticket[]) => tickets?.length
);

