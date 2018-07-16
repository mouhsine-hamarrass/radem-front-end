import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintableCancellationComponent } from './printable-cancellation.component';

describe('PrintableCancellationComponent', () => {
  let component: PrintableCancellationComponent;
  let fixture: ComponentFixture<PrintableCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintableCancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintableCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
