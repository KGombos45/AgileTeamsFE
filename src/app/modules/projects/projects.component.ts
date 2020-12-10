import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.less'],
  providers: [DatePipe],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', border: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectsComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['projectName', 'projectStatusName', 'projectOwner', 'createdBy', 'startDate', 'targetEndDate', 'actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  projectStatuses;
  ticketStatuses;
  usersList;
  userInfo = JSON.parse(localStorage.getItem('User'));
  currentDate = new Date();

  constructor(private service: UserService, private toastr: ToastrService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    
    this.getUsers();
    this.getProjectStatuses();
    this.getTicketStatuses();
    this.getProjects();

  }

  setIsExpanded(data) {
    data.forEach(d => {
      d.isExpanded = false;
      
    });

    return data;
  }

  setElementIsExpanded(element, dataSource) {
    
    dataSource.data.forEach(item => {
      if (item.isExpanded && item.projectID !== element.projectID) {
        item.isExpanded = !item.isExpanded;
      }
    });

    return element.isExpanded = !element.isExpanded;
  }
  
  getProjectStatuses() {
    this.service.getProjectStatuses().subscribe(res => {
      this.projectStatuses = res;
    });
  }

  getTicketStatuses() {
    this.service.getTicketStatuses().subscribe(res => {
      this.ticketStatuses = res;
    });
  }

  onStatusChange(event, element) {
    if (event.source.value !== element.projectStatus) {
      element.projectStatus = event.source.value;
      element.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
      element.modifiedBy = this.userInfo.userName;
    }

    this.service.updateProject(element).subscribe(res => {
      this.toastr.success('Project status updated', 'Project status has been updated succesfully');
    });   
  }

  onOwnerChange(event, element) {
    debugger;
    if (event.source.value !== element.projectOwner) {
      element.projectOwnerID = event.source.value.id;
      element.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
      element.modifiedBy = this.userInfo.userName;
    }


    this.service.updateProject(element).subscribe(res => {
      this.toastr.success('Project owner updated', 'Project owner has been updated succesfully');
    });   
  }

  onStartDateChange(event, element) {
      element.startDate = event.value;
      element.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
      element.modifiedBy = this.userInfo.userName;

      this.service.updateProject(element).subscribe(res => {
        this.toastr.success('Project start date updated', 'Project start date has been updated succesfully');
      }); 
  }

  onTargetEndDateChange(event, element) {
    element.targetEndDate = event.value;
    element.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    element.modifiedBy = this.userInfo.userName;

    this.service.updateProject(element).subscribe(res => {
      this.toastr.success('Project target end date updated', 'Project target end date has been updated succesfully');
    }); 
}


onTicketStatusChange(event, element) {

  if (event.source.value !== element.ticketStatus) {
    element.ticketStatus = event.source.value;
    element.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    element.modifiedBy = this.userInfo.userName;
  }
    

  this.service.updateTicket(element).subscribe(res => {
    this.toastr.success('Ticket status updated', 'Ticket status has been updated succesfully');
  });   
}

onTicketOwnerChange(event, element) {

  if (event.source.value !== element.ticketOwner) {
    element.ticketOwnerID = event.source.value.id;
    element.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    element.modifiedBy = this.userInfo.userName;
  }


  this.service.updateTicket(element).subscribe(res => {
    this.toastr.success('Ticket owner updated', 'Ticket owner has been updated succesfully');
  });   
}

  getProjects() {
    this.service.getProjects().subscribe(
      (res: any) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.setIsExpanded(this.dataSource.data);
      },
      err => {
        console.log(err);
      },
    );
  }

  getUsers() {
    this.service.getUsers().subscribe(
      (res: any) => {
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
    return o1.statusName === o2.statusName && o1.statusID === o2.statusID;
  }

  compareOwners(o1: any, o2: any): boolean {
    return o1.userName === o2.userName;
  }

  compareTicketStatuses(o1: any, o2: any): boolean {
    return o1.statusName === o2.statusName && o1.statusID === o2.statusID;
  }

  compareTicketOwners(o1: any, o2: any): boolean {
    return o1.userName === o2;
  }

}
