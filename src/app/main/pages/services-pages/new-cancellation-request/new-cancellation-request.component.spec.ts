import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCancellationRequestComponent } from './new-cancellation-request.component';

describe('NewCancellationRequestComponent', () => {
  let component: NewCancellationRequestComponent;
  let fixture: ComponentFixture<NewCancellationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCancellationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCancellationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
