import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvicePageComponent } from './advice-page.component';

describe('AdvicePageComponent', () => {
  let component: AdvicePageComponent;
  let fixture: ComponentFixture<AdvicePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvicePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
