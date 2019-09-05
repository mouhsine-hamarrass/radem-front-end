import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundRequestPageComponent } from './refund-request-page.component';

describe('RefundRequestPageComponent', () => {
  let component: RefundRequestPageComponent;
  let fixture: ComponentFixture<RefundRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
