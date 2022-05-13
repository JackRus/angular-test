import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Ticket } from '../features/tickets/store/tickets.models';

/**
 * This service acts as a mock backend.
 *
 * You are free to modify it as you see.
 */

export type User = {
  id: number;
  name: string;
};

function randomDelay() {
  return Math.random() * 1000;
}

@Injectable({ providedIn: 'root' })
export class BackendService {
  storedTickets: Ticket[] = [
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      isCompleted: false,
      priority: 'Low'
    },
    {
      id: 1,
      description: "Move the desk to the new location",
      assigneeId: 111,
      isCompleted: false,
      priority: 'High'
    },
    {
      id: 34,
      description: "It has not yet been officially announced that One Punch Man will occur, although it is said to be taking place soon. As predicted, One Punch Man season 3 will premiere in late 2022 or early 2023, depending on when you count.",
      assigneeId: null,
      isCompleted: false,
      priority: 'Low'
    },
    {
      id: 25,
      description: "Saitama is a God, and he is subconsciously bending reality to his will. In Episode 3 of One Punch Man Saitama reveals that he achieved his God-like level of strength through a daily training regiment of 100 push-ups, 100 sit-ups, 100 squats, and a 10 km run for three years.",
      assigneeId: null,
      isCompleted: false,
      priority: 'High'
    }
  ];

  storedUsers: User[] = [
    { id: 111, name: "Victor" },
    { id: 222, name: "Jack" }
  ];

  lastId = 1;

  private findTicketById = id =>
    this.storedTickets.find(ticket => ticket.id === +id);

  private findUserById = id => this.storedUsers.find(user => user.id === +id);

  tickets() {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  ticket(id: number): Observable<Ticket> {
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTicket(description: string, assigneeId: number | null) {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: description,
      assigneeId,
      isCompleted: false,
      priority: 'Low'
    };

    this.storedTickets = this.storedTickets.concat(newTicket);

    return of(newTicket).pipe(delay(randomDelay()));
  }

  assign(ticketId: number, userId: number) {
    return this.update(ticketId, { assigneeId: userId });
  }

  complete(ticketId: number, isCompleted: boolean) {
    return this.update(ticketId, { isCompleted });
  }

  update(ticketId: number, updates: Partial<Omit<Ticket, "id">>) {
    const foundTicket = this.findTicketById(ticketId);

    if (!foundTicket) {
      return throwError(new Error("ticket not found"));
    }

    const updatedTicket = { ...foundTicket, ...updates };

    this.storedTickets = this.storedTickets.map(t =>
      t.id === ticketId ? updatedTicket : t
    );

    return of(updatedTicket).pipe(delay(randomDelay()));
  }
}
