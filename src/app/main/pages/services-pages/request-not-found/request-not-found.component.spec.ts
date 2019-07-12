import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RequestNotFoundComponent} from './request-not-found.component';

describe('RequestNotFoundComponent', () => {
  let component: RequestNotFoundComponent;
  let fixture: ComponentFixture<RequestNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
