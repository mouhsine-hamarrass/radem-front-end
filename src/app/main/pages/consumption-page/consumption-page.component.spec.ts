import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionPageComponent } from './consumption-page.component';

describe('ConsumptionPageComponent', () => {
  let component: ConsumptionPageComponent;
  let fixture: ComponentFixture<ConsumptionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumptionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
