import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsSubscriptionComponent } from './requests-subscription.component';

describe('RequestsSubscriptionComponent', () => {
  let component: RequestsSubscriptionComponent;
  let fixture: ComponentFixture<RequestsSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
