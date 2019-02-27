import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmbranchementRequestComponent } from './new-embranchement-request.component';

describe('NewEmbranchementRequestComponent', () => {
  let component: NewEmbranchementRequestComponent;
  let fixture: ComponentFixture<NewEmbranchementRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEmbranchementRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmbranchementRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
