import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';


@Component({
  selector: 'app-workitem-view',
  templateUrl: './workitem-view.component.html',
  styleUrls: ['./workitem-view.component.less', '../../../layouts/default/default.component.less'],
  providers: [DatePipe]
})
export class WorkItemViewComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['userName', 'workItem', 'role'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;


  workItem: any = [];
  workItemModel : FormGroup;
  workItemComment : FormGroup;
  currentDate = new Date();
  statuses;
  types;
  projects;
  priorities;
  userInfo = JSON.parse(localStorage.getItem('User'));
  localWorkItem = JSON.parse(localStorage.getItem('WorkItem'));
  usersList;

  constructor(private service: UserService, private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

    this.getWorkItem();
    this.getWorkItemStatuses();
    this.getWorkItemProjects();
    this.getWorkItemTypes();
    this.getWorkItemPriorities();
    this.getUsers();
    this.setWorkItemForm();
    this.getWorkItemsAndTickets();
    this.setWorkItemCommentForm();

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
      targetEndDate: [null],
      comments: [null]
    });

    this.workItem.comments.sort((b, a) => new Date(b.submittedOn).getTime() - new Date(a.submittedOn).getTime());

    this.workItemModel.patchValue(this.workItem);

  }

  setWorkItemCommentForm() {

    this.workItemComment = this.fb.group({
      comment: [null],
      submittedBy: this.userInfo.userName,
      submittedOn: this.datePipe.transform(this.currentDate, 'medium'),
      commentWorkItemID: this.workItem.workItemID
    });
  }

  getWorkItem() {
    this.workItem = this.service.getWorkItem();    

    if (this.workItem.length < 1) {
      this.workItem = this.localWorkItem;
    }

    this.dataSource.data = this.workItem;
    this.dataSource.sort = this.sort;

  }

  getWorkItemsAndTickets() {

    var list = [];
    list.push(this.workItem);

    this.workItem.tickets.forEach(ticket => {
      list.push(ticket);
    });

    this.dataSource.data = list;
    this.dataSource.sort;
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

    this.service.setWorkItem(this.workItem);
    
    this.resetForm();
  }

  resetForm() {
    setTimeout(() => this.setWorkItemForm(),800); 
    setTimeout(() => this.setWorkItemCommentForm(),800); 
  }

  createWorkItemComment() {  
    this.service.createWorkItemComment(this.workItemComment.value).subscribe(res => {
      this.toastr.success('Comment created!', 'Comment succesfully added to work items repository.');
    });

    this.workItemModel.value.comments.push(this.workItemComment.value);
    this.service.setWorkItem(this.workItemModel.value);
    this.setWorkItemCommentForm();

  }

  viewUserProfile(element) {

    this.service.setProfileUserID(element);
    
    this.router.navigate(['/user-profile-view']);
  }

}
