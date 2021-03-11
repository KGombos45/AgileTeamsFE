import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkItemViewComponent } from './workitem-view.component';

describe('WorkItemViewComponent', () => {
  let component: WorkItemViewComponent;
  let fixture: ComponentFixture<WorkItemViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
