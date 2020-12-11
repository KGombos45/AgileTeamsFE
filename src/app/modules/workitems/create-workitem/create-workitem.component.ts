import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-workitem',
  templateUrl: './create-workitem.component.html',
  styleUrls: ['./create-workitem.component.less'],
  providers: [DatePipe]
})
export class CreateWorkItemComponent implements OnInit {

  workItemModel : FormGroup;
  currentDate = new Date();
  statuses;
  types;
  projects;
  userInfo = JSON.parse(localStorage.getItem('User'));
  usersList;
  

  constructor(private service: UserService, private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.setWorkItemForm();
    this.getWorkItemProjects();
    this.getWorkItemStatuses();
    this.getWorkItemTypes();
    this.getUsers();

  }

  setWorkItemForm() {

    this.workItemModel = this.fb.group({
      workItemName: '',
      workItemDescription: '',
      workItemStatusID: [null],
      workItemProjectID: [null],
      workItemTypeID: [null],
      workItemOwnerID: [null],
      createdOn: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'),
      createdBy: [null],
      startDate: [null],
      targetEndDate: [null]
    });
  }

  getWorkItemProjects() {
    this.service.getProjects().subscribe(res => {
      this.projects = res;
    });
  }

  getWorkItemStatuses() {
    this.service.getWorkItemStatuses().subscribe(res => {
      this.statuses = res;
    });
  }

  getWorkItemTypes() {
    this.service.getWorkItemTypes().subscribe(res => {
      this.types = res;
    });
  }

  getUsers() {
    this.service.getUsers().subscribe(
      res => {
        this.usersList = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  createWorkItem() {  
    this.workItemModel.value.createdBy = this.userInfo.userName;
    debugger;
    this.service.createWorkItem(this.workItemModel).subscribe(res => {
      this.toastr.success('Work item created!', 'Work item succesfully added to work items repository.');
    });

    this.setWorkItemForm();

  }


}
