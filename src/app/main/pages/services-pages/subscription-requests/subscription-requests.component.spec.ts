import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionRequestsComponent } from './subscription-requests.component';

describe('SubscriptionRequestsComponent', () => {
  let component: SubscriptionRequestsComponent;
  let fixture: ComponentFixture<SubscriptionRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
