import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsomationComponent } from './consomation.component';

describe('ConsomationComponent', () => {
  let component: ConsomationComponent;
  let fixture: ComponentFixture<ConsomationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsomationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
