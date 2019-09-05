import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminationPageComponent } from './termination-page.component';

describe('TerminationPageComponent', () => {
  let component: TerminationPageComponent;
  let fixture: ComponentFixture<TerminationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
