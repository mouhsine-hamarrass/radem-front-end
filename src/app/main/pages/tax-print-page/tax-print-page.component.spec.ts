import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPrintPageComponent } from './tax-print-page.component';

describe('TaxPrintPageComponent', () => {
  let component: TaxPrintPageComponent;
  let fixture: ComponentFixture<TaxPrintPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxPrintPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxPrintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
