import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeRequestComponent } from './subscribe-request.component';

describe('SubscribeRequestComponent', () => {
  let component: SubscribeRequestComponent;
  let fixture: ComponentFixture<SubscribeRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
