import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundPrintPageComponent } from './refund-print-page.component';

describe('RefundPrintPageComponent', () => {
  let component: RefundPrintPageComponent;
  let fixture: ComponentFixture<RefundPrintPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundPrintPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundPrintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
