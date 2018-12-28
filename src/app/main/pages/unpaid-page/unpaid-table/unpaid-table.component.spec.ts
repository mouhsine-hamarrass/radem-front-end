import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidTableComponent } from './unpaid-table.component';

describe('UnpaidTableComponent', () => {
  let component: UnpaidTableComponent;
  let fixture: ComponentFixture<UnpaidTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpaidTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
