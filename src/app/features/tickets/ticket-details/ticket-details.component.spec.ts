import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { watchRouteParam } from 'src/app/shared/tools/router-helpers';
import { TicketDetailsComponent } from './ticket-details.component';
import { TicketsFacade } from '../store/tickets.facade';

describe('TicketDetailsComponent', () => {
  let component: TicketDetailsComponent;
  let fixture: ComponentFixture<TicketDetailsComponent>;
  const initialState = { loggedIn: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketDetailsComponent ],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        TicketsFacade,
        { provide: watchRouteParam, useValue: watchRouteParam }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
