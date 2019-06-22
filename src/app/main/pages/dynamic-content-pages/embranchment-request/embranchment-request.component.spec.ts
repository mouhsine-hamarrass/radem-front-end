import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {EmbranchmentRequestComponent} from './embranchment-request.component';

describe('EmbranchmentRequestComponent', () => {
  let component: EmbranchmentRequestComponent;
  let fixture: ComponentFixture<EmbranchmentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbranchmentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbranchmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
