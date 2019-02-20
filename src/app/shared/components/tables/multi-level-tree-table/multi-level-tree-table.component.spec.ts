import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLevelTreeTableComponent } from './multi-level-tree-table.component';

describe('MultiLevelTreeTableComponent', () => {
  let component: MultiLevelTreeTableComponent;
  let fixture: ComponentFixture<MultiLevelTreeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLevelTreeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLevelTreeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
