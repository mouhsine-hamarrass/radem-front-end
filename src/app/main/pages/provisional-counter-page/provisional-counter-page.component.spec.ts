import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionalCounterPageComponent } from './provisional-counter-page.component';

describe('ProvisionalCounterPageComponent', () => {
  let component: ProvisionalCounterPageComponent;
  let fixture: ComponentFixture<ProvisionalCounterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionalCounterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionalCounterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
