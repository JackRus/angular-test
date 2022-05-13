import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TicketsEffects } from './store/tickets.effects';
import { TicketsFacade } from './store/tickets.facade';
import * as fromTickets from './store/tickets.reducer';
import { TicketAssigneeSelectionComponent } from './ticket-assignee-selection/ticket-assignee-selection.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketAddComponent } from './ticket-list/ticket-add/ticket-add.component';
import { TicketListItemComponent } from './ticket-list/ticket-list-item/ticket-list-item.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

@NgModule({
    declarations: [
        TicketDetailsComponent,
        TicketListComponent,
        TicketAddComponent,
        TicketListItemComponent,
        TicketAssigneeSelectionComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatCheckboxModule,
        MatButtonModule,
        RouterModule.forChild([
            {
                path: ":id",
                component: TicketDetailsComponent,
                pathMatch: "full",
            },
            {
                path: "",
                component: TicketListComponent,
            },
        ]),
        StoreModule.forFeature(
            fromTickets.TICKETS_FEATURE_KEY,
            fromTickets.reducer
        ),
        EffectsModule.forFeature([TicketsEffects]),
    ],
    providers: [TicketsFacade]
})
export class TicketsModule {}

