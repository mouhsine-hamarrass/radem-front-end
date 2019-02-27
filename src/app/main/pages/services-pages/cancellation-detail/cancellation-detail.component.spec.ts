import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationDetailComponent } from './cancellation-detail.component';

describe('CancellationDetailComponent', () => {
  let component: CancellationDetailComponent;
  let fixture: ComponentFixture<CancellationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
