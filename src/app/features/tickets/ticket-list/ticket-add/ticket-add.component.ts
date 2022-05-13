import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketsFacade } from '../../store/tickets.facade';

@Component({
    selector: "jj-ticket-add",
    templateUrl: "./ticket-add.component.html",
})
export class TicketAddComponent {

    constructor(private ticketService: TicketsFacade) {}

    description = new FormControl(null, Validators.required);
    assigneeId: number | null = null;

    addTicket() {
        if (!this.description.valid) return;
        this.ticketService.addTicket(this.description.value, this.assigneeId);
        this.description.reset();
    }
}
