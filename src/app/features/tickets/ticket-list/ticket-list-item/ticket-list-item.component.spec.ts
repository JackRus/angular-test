import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TicketListItemComponent } from './ticket-list-item.component';
import { TicketsFacade } from '../../store/tickets.facade';

describe('TicketListItemComponent', () => {
  let component: TicketListItemComponent;
  let fixture: ComponentFixture<TicketListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketListItemComponent ],
      providers: [
        provideMockStore(),
        TicketsFacade,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListItemComponent);
    component = fixture.componentInstance;
    component.ticket = {
      id: 2,
      description: "Install a monitor arm",
      assigneeId: 111,
      isCompleted: false,
      priority: 'Low'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
