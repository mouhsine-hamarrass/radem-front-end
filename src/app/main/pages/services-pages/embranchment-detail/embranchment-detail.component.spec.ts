import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbranchmentDetailComponent } from './embranchment-detail.component';

describe('EmbranchmentDetailComponent', () => {
  let component: EmbranchmentDetailComponent;
  let fixture: ComponentFixture<EmbranchmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbranchmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbranchmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
