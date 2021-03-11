import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateWorkItemComponent } from './create-workitem.component';

describe('CreateWorkItemComponent', () => {
  let component: CreateWorkItemComponent;
  let fixture: ComponentFixture<CreateWorkItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
