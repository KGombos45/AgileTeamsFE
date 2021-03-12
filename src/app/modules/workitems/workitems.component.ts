import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-workitems',
  templateUrl: './workitems.component.html',
  styleUrls: ['./workitems.component.less', '../../layouts/default/default.component.less'],
  providers: [DatePipe],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WorkItemsComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['workItemName', 'workItemStatusName', 'workItemOwner', 'workItemPriorityName', 'workItemProject', 'createdBy', 'startDate', 'targetEndDate', 'actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  workItemStatuses;
  workItemTypes;
  workItemPriorities;
  ticketStatuses;
  usersList;
  projects;
  userInfo = JSON.parse(localStorage.getItem('User'));
  currentDate = new Date();

  constructor(private service: UserService, private toastr: ToastrService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
   
    this.getUsers();
    this.getWorkItemProjects();
    this.getWorkItemStatuses();
    this.getTicketStatuses();
    this.getWorkItemPriorities();
    this.getWorkItems();

  }

  setIsExpanded(data) {
    data.forEach(d => {
      d.isExpanded = false;
      
    });

    return data;
  }

  setElementIsExpanded(element, dataSource) {
    
    dataSource.data.forEach(item => {
      if (item.isExpanded && item.workItemID !== element.workItemID) {
        item.isExpanded = !item.isExpanded;
      }
    });

    return element.isExpanded = !element.isExpanded;
  }

  getWorkItemProjects() {
    this.service.getProjects().subscribe(res => {
      this.projects = res;
    });
  }
  
  getWorkItemStatuses() {
    this.service.getWorkItemStatuses().subscribe(res => {
      this.workItemStatuses = res;
    });
  }

  getTicketStatuses() {
    this.service.getTicketStatuses().subscribe(res => {
      this.ticketStatuses = res;
    });
  }
  
  getWorkItemTypes() {
    this.service.getWorkItemTypes().subscribe(res => {
      this.workItemTypes = res;
    });
  }

  getWorkItemPriorities() {
    this.service.getWorkItemPriorities().subscribe(res => {
      this.workItemPriorities = res;
    })
  }

  onStatusChange(event, element) {
    if (event.source.value !== element.workItemStatus) {
      element.workItemStatus = event.source.value;
      element.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
      element.modifiedBy = this.userInfo.userName;
    }

    this.service.updateWorkItem(element).subscribe(res => {
      this.toastr.success('Work item status updated', 'Work item status has been updated succesfully');
    });   
  }

  onPriorityChange(event, element) {
    if (event.source.value !== element.workItemPriority) {
      element.workItemPriority = event.source.value;
      element.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
      element.modifiedBy = this.userInfo.userName;
    }

    this.service.updateWorkItem(element).subscribe(res => {
      this.toastr.success('Work item priority updated', 'Work item priority has been updated succesfully');
    });   
  }


  onProjectChange(event, element) {
    if (event.source.value !== element.project) {
      element.project = event.source.value;
      element.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
      element.modifiedBy = this.userInfo.userName;
    }

    this.service.updateWorkItem(element).subscribe(res => {
      this.toastr.success('Work item project updated', 'Work item project has been updated succesfully');
    });   
  }

  onOwnerChange(event, element) {
    if (event.source.value !== element.workItemOwner) {
      element.workItemOwnerID = event.source.value.id;
      element.workItemOwner = event.source.value;
      element.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
      element.modifiedBy = this.userInfo.userName;
    }


    this.service.updateWorkItem(element).subscribe(res => {
      this.toastr.success('Work item owner updated', 'Work item owner has been updated succesfully');
    });   
  }

  onStartDateChange(event, element) {
      element.startDate = event.value;
      element.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
      element.modifiedBy = this.userInfo.userName;

      this.service.updateWorkItem(element).subscribe(res => {
        this.toastr.success('Work item start date updated', 'Work item start date has been updated succesfully');
      }); 
  }

  onTargetEndDateChange(event, element) {
    element.targetEndDate = event.value;
    element.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    element.modifiedBy = this.userInfo.userName;

    this.service.updateWorkItem(element).subscribe(res => {
      this.toastr.success('Work item target end date updated', 'Work item target end date has been updated succesfully');
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

  getWorkItems() {
    this.service.getWorkItems().subscribe(
      (res: any) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
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

  deleteWorkItem(element) {
    this.service.deleteWorkItem(element).subscribe(res => {
      if (element.tickets.length > 0) {
        this.toastr.warning('Work item and tickets deleted', 'Updated successfully');
      } else {
        this.toastr.warning('Work item deleted', 'Updated successfully');
      }
      this.getWorkItems();
    });    
    
    this.table.renderRows();
  }

  viewWorkItem(element) {

    this.service.setWorkItem(element);

    this.router.navigate(['/workitem-view']);
  }

  viewWorkItemTicket(ticket) {

    this.service.setTicket(ticket);

    this.router.navigate(['/ticket-view']);
  }

  compareStatuses(o1: any, o2: any): boolean {
    return o1.statusName === o2.statusName && o1.statusID === o2.statusID;
  }

  comparePriorities(o1: any, o2: any): boolean {
    return o1.priorityName === o2.priorityName && o1.priorityID === o2.priorityID;
  }


  compareProjects(o1: any, o2: any): boolean {
    return o1.projectName === o2.projectName;
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
