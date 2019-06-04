import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRefundDetailComponent } from './new-refund-detail.component';

describe('NewRefundDetailComponent', () => {
  let component: NewRefundDetailComponent;
  let fixture: ComponentFixture<NewRefundDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRefundDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRefundDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
