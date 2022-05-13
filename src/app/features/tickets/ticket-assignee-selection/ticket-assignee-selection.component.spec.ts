import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TicketAssigneeSelectionComponent } from './ticket-assignee-selection.component';
import { TicketsFacade } from '../store/tickets.facade';

describe('TicketAssigneeSelectionComponent', () => {
  let component: TicketAssigneeSelectionComponent;
  let fixture: ComponentFixture<TicketAssigneeSelectionComponent>;
  const initialState = { };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketAssigneeSelectionComponent ],
      providers: [
        provideMockStore({ initialState }),
        TicketsFacade,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAssigneeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
