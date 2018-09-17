import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionsPageComponent } from './consumptions-page.component';

describe('ConsumptionPageComponent', () => {
  let component: ConsumptionsPageComponent;
  let fixture: ComponentFixture<ConsumptionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumptionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
