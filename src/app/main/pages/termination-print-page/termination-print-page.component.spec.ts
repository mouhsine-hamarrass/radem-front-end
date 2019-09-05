import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminationPrintPageComponent } from './termination-print-page.component';

describe('TerminationPrintPageComponent', () => {
  let component: TerminationPrintPageComponent;
  let fixture: ComponentFixture<TerminationPrintPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminationPrintPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminationPrintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
