import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTerminationComponent } from './new-termination.component';

describe('NewTerminationComponent', () => {
  let component: NewTerminationComponent;
  let fixture: ComponentFixture<NewTerminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTerminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTerminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
