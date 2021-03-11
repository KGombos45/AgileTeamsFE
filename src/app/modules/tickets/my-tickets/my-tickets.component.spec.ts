import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyTicketsComponent } from './my-tickets.component';

describe('MyTicketsComponent', () => {
  let component: MyTicketsComponent;
  let fixture: ComponentFixture<MyTicketsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
