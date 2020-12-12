import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-workitem-view',
  templateUrl: './workitem-view.component.html',
  styleUrls: ['./workitem-view.component.less'],
  providers: [DatePipe]
})
export class WorkItemViewComponent implements OnInit {

  workItem: any = [];
  workItemModel : FormGroup;
  currentDate = new Date();
  statuses;
  types;
  projects;
  priorities;
  userInfo = JSON.parse(localStorage.getItem('User'));
  usersList;

  constructor(private service: UserService, private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getWorkItem();
    this.getWorkItemStatuses();
    this.getWorkItemProjects();
    this.getWorkItemTypes();
    this.getWorkItemPriorities();
    this.getUsers();
    this.setWorkItemForm();

  }

  setWorkItemForm() {

    this.workItemModel = this.fb.group({
      workItemID: [null],
      workItemName: '',
      workItemDescription: '',
      workItemStatusID: [null],
      workItemProjectID: [null],
      workItemPriorityID: [null],
      workItemTypeID: [null],
      workItemOwnerID: [null],
      workItemOwner: [null],
      createdOn: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'),
      createdBy: [null],
      modifiedBy: [null],
      modifiedOn: [null],
      startDate: [null],
      targetEndDate: [null]
    });

    this.workItemModel.patchValue(this.workItem);

  }

  getWorkItem() {
    this.workItem = this.service.getWorkItem();
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

  getWorkItemPriorities() {
    this.service.getWorkItemPriorities().subscribe(res => {
      this.priorities = res;
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

  updateWorkItem() { 
    this.workItemModel.value.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.workItemModel.value.modifiedBy = this.userInfo.userName;
    this.service.updateWorkItem(this.workItemModel.value).subscribe(res => {
      this.toastr.success('Work item updated', 'Work item has been updated succesfully');
    });   

    this.workItem = this.workItemModel.value;
    
    this.resetForm();
  }

  resetForm() {
    setTimeout(() => this.setWorkItemForm(),800); 

  }

}
