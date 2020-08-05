import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.less']
})
export class ProjectsComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['projectName', 'projectStatusName', 'projectOwner', 'createdBy', 'startDate', 'targetEndDate', 'actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  statuses;
  usersList;

  constructor(private service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getProjectStatuses();
    this.getUsers();
    this.getProjects();

  }

  
  getProjectStatuses() {
    this.service.getProjectStatuses().subscribe(res => {
      this.statuses = res;
    });
  }

  onStatusChange(event, element) {
    if (event.source.value !== element.projectStatus)
      element.projectStatus = event.source.value;

    this.service.updateProject(element).subscribe(res => {
      this.toastr.success('Project status updated', 'Project status has been updated succesfully');
    });   
  }

  onOwnerChange(event, element) {
    if (event.source.value !== element.projectOwner)
      element.projectOwner = event.source.value;

    this.service.updateProject(element).subscribe(res => {
      this.toastr.success('Project owner updated', 'Project owner has been updated succesfully');
    });   
  }

  getProjects() {
    this.service.getProjects().subscribe(
      (res: any) => {
        this.dataSource.data = res;
        debugger;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        console.log(err);
      },
    );
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

  deleteProject(row) {
    this.service.deleteProject(row).subscribe(res => {
      this.toastr.warning('Project deleted', 'Updated successfully');
      this.getProjects();
    });    
    
    this.table.renderRows();
  }

  compareStatuses(o1: any, o2: any): boolean {
    return o1.projectStatusName === o2.projectStatusName && o1.projectStatusId === o2.projectStatusId;
  }

  compareOwners(o1: any, o2: any): boolean {
    return o1.userName === o2.userName && o1.id === o2.id;
  }

}
