import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketThreadComponent } from './ticket-thread.component';

describe('TicketThreadComponent', () => {
  let component: TicketThreadComponent;
  let fixture: ComponentFixture<TicketThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
