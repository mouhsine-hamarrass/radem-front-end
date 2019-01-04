import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsBillsComponent } from './notifications-bills.component';

describe('NotificationsBillsComponent', () => {
  let component: NotificationsBillsComponent;
  let fixture: ComponentFixture<NotificationsBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
