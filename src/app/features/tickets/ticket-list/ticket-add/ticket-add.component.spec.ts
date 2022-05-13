import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TicketAddComponent } from './ticket-add.component';
import { TicketsFacade } from '../../store/tickets.facade';

describe('TicketAddComponent', () => {
  let component: TicketAddComponent;
  let fixture: ComponentFixture<TicketAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketAddComponent ],
      providers: [
        provideMockStore({ }),
        TicketsFacade,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
