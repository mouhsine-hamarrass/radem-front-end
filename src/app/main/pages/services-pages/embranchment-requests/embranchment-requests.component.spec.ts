import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbranchmentRequestsComponent } from './embranchment-requests.component';

describe('EmbranchmentRequestsComponent', () => {
  let component: EmbranchmentRequestsComponent;
  let fixture: ComponentFixture<EmbranchmentRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbranchmentRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbranchmentRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
