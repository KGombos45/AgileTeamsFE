import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyWorkItemsComponent } from './my-work-items.component';

describe('MyWorkItemsComponent', () => {
  let component: MyWorkItemsComponent;
  let fixture: ComponentFixture<MyWorkItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWorkItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWorkItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
