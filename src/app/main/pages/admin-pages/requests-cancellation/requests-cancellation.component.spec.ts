import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsCancellationComponent } from './requests-cancellation.component';

describe('RequestsCancellationComponent', () => {
  let component: RequestsCancellationComponent;
  let fixture: ComponentFixture<RequestsCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsCancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
