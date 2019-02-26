import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRefundRequestComponent } from './new-refund-request.component';

describe('NewRefundRequestComponent', () => {
  let component: NewRefundRequestComponent;
  let fixture: ComponentFixture<NewRefundRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRefundRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRefundRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
