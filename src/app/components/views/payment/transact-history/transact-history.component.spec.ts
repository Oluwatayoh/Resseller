import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactHistoryComponent } from './transact-history.component';

describe('TransactHistoryComponent', () => {
  let component: TransactHistoryComponent;
  let fixture: ComponentFixture<TransactHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
