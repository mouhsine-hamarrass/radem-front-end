import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidsPageComponent } from './unpaid-page.component';

describe('UnpaidComponent', () => {
  let component: UnpaidsPageComponent;
  let fixture: ComponentFixture<UnpaidsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpaidsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
