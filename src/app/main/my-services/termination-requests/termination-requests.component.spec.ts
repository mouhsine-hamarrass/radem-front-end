import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminationRequestsComponent } from './termination-requests.component';

describe('TerminationRequestsComponent', () => {
  let component: TerminationRequestsComponent;
  let fixture: ComponentFixture<TerminationRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminationRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
