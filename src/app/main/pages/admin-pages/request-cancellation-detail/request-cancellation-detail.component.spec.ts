import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCancellationDetailComponent } from './request-cancellation-detail.component';

describe('RequestCancellationDetailComponent', () => {
  let component: RequestCancellationDetailComponent;
  let fixture: ComponentFixture<RequestCancellationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestCancellationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCancellationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
