import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TicketsFacade } from '../store/tickets.facade';


@Component({
  selector: 'jj-ticket-assignee-selection',
  templateUrl: './ticket-assignee-selection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketAssigneeSelectionComponent {

  assignee: number| null = null;
  assignees$ = this.ticketService.assignees$;

  @Input('assignee') set _assignee(assignee: number | null) {
    this.assignee = assignee;
  }

  @Output() changed = new EventEmitter<number | null>();

  constructor(private ticketService: TicketsFacade) {}

  assign() {
    this.changed.emit(this.assignee);
  }
}
