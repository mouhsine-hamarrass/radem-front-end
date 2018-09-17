import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementsPageComponent } from './settlements-page.component';

describe('SettlementsComponent', () => {
  let component: SettlementsPageComponent;
  let fixture: ComponentFixture<SettlementsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
