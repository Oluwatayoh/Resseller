import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTicketComponent } from './message-ticket.component';

describe('MessageTicketComponent', () => {
  let component: MessageTicketComponent;
  let fixture: ComponentFixture<MessageTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
