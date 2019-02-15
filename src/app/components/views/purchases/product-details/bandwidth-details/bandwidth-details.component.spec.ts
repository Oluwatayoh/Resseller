import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandwidthDetailsComponent } from './bandwidth-details.component';

describe('BandwidthDetailsComponent', () => {
  let component: BandwidthDetailsComponent;
  let fixture: ComponentFixture<BandwidthDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandwidthDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandwidthDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
