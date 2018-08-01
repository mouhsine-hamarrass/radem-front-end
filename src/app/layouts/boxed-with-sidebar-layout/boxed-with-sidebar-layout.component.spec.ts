import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxedWithSidebarLayoutComponent } from './boxed-with-sidebar-layout.component';

describe('BoxedWithSidebarLayoutComponent', () => {
  let component: BoxedWithSidebarLayoutComponent;
  let fixture: ComponentFixture<BoxedWithSidebarLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxedWithSidebarLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxedWithSidebarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
