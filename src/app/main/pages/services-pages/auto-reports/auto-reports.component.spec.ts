import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoReportsComponent } from './auto-reports.component';

describe('AutoReportsComponent', () => {
  let component: AutoReportsComponent;
  let fixture: ComponentFixture<AutoReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
