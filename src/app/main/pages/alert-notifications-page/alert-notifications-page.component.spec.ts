import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNotificationsPageComponent } from './alert-notifications-page.component';

describe('AlertNotificationsPageComponent', () => {
  let component: AlertNotificationsPageComponent;
  let fixture: ComponentFixture<AlertNotificationsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertNotificationsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertNotificationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
