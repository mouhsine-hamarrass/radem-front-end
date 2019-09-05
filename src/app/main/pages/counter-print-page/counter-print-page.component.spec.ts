import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterPrintPageComponent } from './counter-print-page.component';

describe('CounterPrintPageComponent', () => {
  let component: CounterPrintPageComponent;
  let fixture: ComponentFixture<CounterPrintPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterPrintPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterPrintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
