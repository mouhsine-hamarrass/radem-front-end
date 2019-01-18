import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSubscriptionDetailComponent } from './request-subscription-detail.component';

describe('RequestSubscriptionDetailComponent', () => {
  let component: RequestSubscriptionDetailComponent;
  let fixture: ComponentFixture<RequestSubscriptionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestSubscriptionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSubscriptionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
