import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactHistoryPreviewComponent } from './transact-history-preview.component';

describe('TransactHistoryPreviewComponent', () => {
  let component: TransactHistoryPreviewComponent;
  let fixture: ComponentFixture<TransactHistoryPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactHistoryPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactHistoryPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
