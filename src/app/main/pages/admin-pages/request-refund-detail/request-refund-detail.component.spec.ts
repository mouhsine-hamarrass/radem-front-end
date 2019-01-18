import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRefundDetailComponent } from './request-refund-detail.component';

describe('RequestRefundDetailComponent', () => {
  let component: RequestRefundDetailComponent;
  let fixture: ComponentFixture<RequestRefundDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestRefundDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRefundDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
