import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandwidthComponent } from './bandwidth.component';

describe('BandwidthComponent', () => {
  let component: BandwidthComponent;
  let fixture: ComponentFixture<BandwidthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandwidthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandwidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
