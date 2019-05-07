import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NigcomsatOrderComponent } from './nigcomsat-order.component';

describe('NigcomsatOrderComponent', () => {
  let component: NigcomsatOrderComponent;
  let fixture: ComponentFixture<NigcomsatOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NigcomsatOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NigcomsatOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
