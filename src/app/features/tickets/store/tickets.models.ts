export interface Ticket {
    id: number;
    description: string;
    assigneeId?: number;
    isCompleted: boolean;
    isPending?: boolean;
    isPinned?: boolean;
    priority?: 'High' | 'Normal' | 'Low';
}

export interface TicketDetails extends Ticket {
    notes: string[];
 }

 export enum TicketFilterOption {
    All = 'all',
    NotAssigned = 'not-assigned',
    Assigned = 'assigned',
    Completed = 'completed',
    NotCompleted = 'not-completed'
 };

 export const TICKET_FILTERS = [
    { label: 'Not Assigned', option: TicketFilterOption.NotAssigned },
    { label: 'Not Completed', option: TicketFilterOption.NotCompleted },
    { label: 'Assigned', option: TicketFilterOption.Assigned },
    { label: 'Completed', option: TicketFilterOption.Completed },
    { label: 'All Tickets', option: TicketFilterOption.All }
];
