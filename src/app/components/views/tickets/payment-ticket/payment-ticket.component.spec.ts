import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTicketComponent } from './payment-ticket.component';

describe('PaymentTicketComponent', () => {
  let component: PaymentTicketComponent;
  let fixture: ComponentFixture<PaymentTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
