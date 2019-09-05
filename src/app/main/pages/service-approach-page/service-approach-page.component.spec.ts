import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceApproachPageComponent } from './service-approach-page.component';

describe('ServiceApproachPageComponent', () => {
  let component: ServiceApproachPageComponent;
  let fixture: ComponentFixture<ServiceApproachPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceApproachPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceApproachPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
