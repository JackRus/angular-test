import { Ticket, TicketFilterOption } from '../store/tickets.models';

export function filterTickets (tickets: Ticket[], filterOption: TicketFilterOption): Ticket[] {
    switch (filterOption) {
        case 'not-assigned': return tickets.filter(ticket => !ticket.assigneeId);
        case 'assigned': return tickets.filter(ticket => ticket.assigneeId);
        case 'completed': return tickets.filter(ticket => ticket.isCompleted);
        case "not-completed": return tickets.filter((ticket) => !ticket.isCompleted);
        default: return tickets;
    }
}
