import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsRefundComponent } from './requests-refund.component';

describe('RequestsRefundComponent', () => {
  let component: RequestsRefundComponent;
  let fixture: ComponentFixture<RequestsRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
