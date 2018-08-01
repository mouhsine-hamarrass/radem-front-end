import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationRequestsComponent } from './cancellation-requests.component';

describe('CancellationRequestsComponent', () => {
  let component: CancellationRequestsComponent;
  let fixture: ComponentFixture<CancellationRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellationRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
