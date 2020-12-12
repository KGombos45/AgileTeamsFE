import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.less'],
  providers: [DatePipe]
})
export class MyTicketsComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['ticketName', 'ticketOwner', 'ticketWorkItem', 'ticketStatus', 'createdBy', 'createdOn', 'actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  statuses;
  usersList;
  workItemsList;
  userInfo = JSON.parse(localStorage.getItem('User'));
  currentDate = new Date();


  constructor(private service: UserService, private toastr: ToastrService, private datePipe: DatePipe, private router: Router) { }

  async ngOnInit() {

    this.getUsers();
    this.getTicketStatuses();
    this.getWorkItems();
    this.getUserTickets();
  }
  
  getUserTickets() {
    this.service.getUserTickets(this.userInfo.id).subscribe(
      (res: any) => {
        debugger;
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        console.log(err);
      },
    );
  }

  getWorkItems() {
    this.service.getWorkItems().subscribe(
      (res: any) => {
        this.workItemsList = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  deleteTicket(row) {
    this.service.deleteTicket(row).subscribe(res => {
      this.toastr.warning('Ticket deleted', 'Updated successfully');
      this.getUserTickets();
    });    
    
    this.table.renderRows();
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

  getTicketStatuses() {
    this.service.getTicketStatuses().subscribe(res => {
      this.statuses = res;
    });
  }

  onStatusChange(event, element) {
    if (event.source.value !== element.ticketStatus)
      element.ticketStatus = event.source.value;

    this.service.updateTicket(element).subscribe(res => {
      this.toastr.success('Ticket status updated', 'Ticket status has been updated succesfully');
    });   
  }

  onWorkItemChange(event, element) {
    if (event.source.value !== element.ticketWorkItem) {
      element.ticketWorkItem = event.source.value;
      element.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
      element.modifiedBy = this.userInfo.userName;
    }


    this.service.updateTicket(element).subscribe(res => {
      this.toastr.success('Ticket work item updated', 'Ticket status has been updated succesfully');
    });   
  }

  onOwnerChange(event, element) {
    if (event.source.value !== element.ticketOwner) {
      element.ticketOwnerID = event.source.value.id;
      element.modifiedOn = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
      element.modifiedBy = this.userInfo.userName;
    }
    
    this.service.updateTicket(element).subscribe(res => {
      this.toastr.success('Ticket owner updated', 'Ticket owner has been updated succesfully');
    });   
  }

  viewTicket(element) {

    this.service.setTicket(element);

    this.router.navigate(['/ticket-view']);
  }

  compareOwners(o1: any, o2: any): boolean {
    return o1.userName === o2;
  }

  compareWorkItems(o1: any, o2: any): boolean {
    return o1.workItemName === o2;
  }

  compareStatuses(o1: any, o2: any): boolean {
    return o1.statusName === o2.statusName && o1.statusID === o2.statusID;
  }

}
