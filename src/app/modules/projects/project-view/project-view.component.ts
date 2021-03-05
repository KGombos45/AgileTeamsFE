import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { _MAT_HINT } from '@angular/material/form-field';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.less', '../../../layouts/default/default.component.less'],
  providers: [DatePipe]
})
export class ProjectViewComponent implements OnInit {

  project: any = [];
  projectModel: FormGroup;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['workItemName', 'workItemStatusName', 'workItemOwner', 'workItemPriorityName', 'createdBy'];
  dataSource2 = new MatTableDataSource();
  displayedColumns2: string[] = ['userName', 'workItem', 'role'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private service: UserService, private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getProject();
    this.getWorkItemsAndTickets();
    this.setProjectValues();
  }

  getProject() {
    this.project = this.service.getProject();
    this.dataSource.data = this.project.workItems;
  }

  getWorkItemsAndTickets() {

    var list = [];

    this.project.workItems.forEach(workItem => {
      list.push(workItem);
      workItem.tickets.forEach(ticket => {
        list.push(ticket);        
      });
      
    });
    debugger;

    this.dataSource2.data = list;
    this.dataSource2.sort;
  }

  setProjectValues() {

    this.projectModel = this.fb.group({
      projectID: [null],
      projectName: [null],
      description: [null],
      createdOn: [null],
      createdBy: [null]
    });
     
    this.projectModel.patchValue(this.project);

  }

  updateProject() {
    this.service.updateProject(this.projectModel).subscribe(res => {
      this.toastr.success('Project infomation succesfully updated', 'Updated successfully');
    });    

    this.project = this.projectModel.value;
    this.resetForm();

  }

  resetForm() {
    setTimeout(() => this.setProjectValues(),800); 

  }

  viewWorkItem(element) {

    this.service.setWorkItem(element);

    this.router.navigate(['/workitem-view']);
  }

  viewUserProfile(element) {

    this.service.setProfileUserID(element);

    this.router.navigate(['/user-profile-view']);
  }

}
