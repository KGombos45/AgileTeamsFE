import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkItemsComponent } from './workitems.component';

describe('WorkItemsComponent', () => {
  let component: WorkItemsComponent;
  let fixture: ComponentFixture<WorkItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
