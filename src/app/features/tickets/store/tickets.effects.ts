import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { BackendService } from 'src/app/shared/backend.service';
import { ErrorMessageService } from 'src/app/shared/tools/error-message.service';
import * as TicketsActions from './tickets.actions';

@Injectable()
export class TicketsEffects {

    init$ = createEffect(() =>
    this.actions$.pipe(
        ofType(TicketsActions.getTickets),
        mergeMap((action) => this.backendService.tickets()
            .pipe(
                mergeMap(tickets => [TicketsActions.getTicketsSuccess({ tickets })]),
                catchError(error => of(TicketsActions.apiFailure({ error, source: action.type })))
            )
        )
    ));

    getTicketById$ = createEffect(() =>
    this.actions$.pipe(
        ofType(TicketsActions.getTicketById),
        mergeMap((action) => this.backendService.ticket(action.id)
            .pipe(
                mergeMap(ticket => [
                    TicketsActions.getTicketByIdSuccess({ ticket }),
                    TicketsActions.selectTicket({ ticketId: ticket.id})
                ]),
                catchError(error => of(TicketsActions.apiFailure({ error: 'Could not find this ticket. Please try another one.', source: action.type })))
            )
        )
    ));

    addTicket$ = createEffect(() =>
    this.actions$.pipe(
        ofType(TicketsActions.addTicket),
        mergeMap((action) => this.backendService.newTicket(action.description, action.assigneeId)
            .pipe(
                map(ticket => TicketsActions.updateTicketSuccess({ ticket })),
                catchError(error => of(TicketsActions.apiFailure({ error, source: action.type })))
            )
        )
    ));

    markAsCompleted$ = createEffect(() =>
    this.actions$.pipe(
        ofType(TicketsActions.markAsCompleted),
        mergeMap((action) => this.backendService.complete(action.id, action.complete)
            .pipe(
                map(ticket => TicketsActions.updateTicketSuccess({ ticket })),
                catchError(error => of(TicketsActions.apiFailure({ error, source: action.type })))
            )
        )
    ));

    getAssignees$ = createEffect(() =>
    this.actions$.pipe(
        ofType(TicketsActions.getAssignees),
        mergeMap((action) => this.backendService.users()
            .pipe(
                map(assignees => TicketsActions.getAssigneesSuccess({ assignees })),
                catchError(error => of(TicketsActions.apiFailure({ error, source: action.type })))
            )
        )
    ));


    assignTicket$ = createEffect(() =>
    this.actions$.pipe(
        ofType(TicketsActions.assignTicket),
        mergeMap((action) => this.backendService.assign(action.ticketId, action.assigneeId)
            .pipe(
                map(ticket => TicketsActions.updateTicketSuccess({ ticket })),
                catchError(error => of(TicketsActions.apiFailure({ error, source: action.type })))
            )
        )
    ));

    updateTicket$ = createEffect(() =>
    this.actions$.pipe(
        ofType(TicketsActions.updateTicket),
        mergeMap((action) => this.backendService.update(action.ticket.id, action.ticket)
            .pipe(
                map(ticket => TicketsActions.updateTicketSuccess({ ticket })),
                catchError(error => of(TicketsActions.apiFailure({ error, source: action.type })))
            )
        )
    ));

    apiFailure$ = createEffect(() =>
    this.actions$.pipe(
        ofType(TicketsActions.apiFailure),
        tap((action) => this.errorService.showError(action.error))
    ), { dispatch: false});

    constructor(private readonly actions$: Actions, private backendService: BackendService, private errorService: ErrorMessageService) {}
}
