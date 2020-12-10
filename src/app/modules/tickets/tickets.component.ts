import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.less']
})
export class TicketsComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['ticketName', 'ticketOwner', 'ticketProject', 'ticketStatus', 'createdBy', 'createdOn', 'actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  statuses;
  usersList;
  projectsList;
  userInfo = JSON.parse(localStorage.getItem('User'));

  constructor(private service: UserService, private toastr: ToastrService) { }

  async ngOnInit() {

    this.getUsers();
    this.getTicketStatuses();
    this.getProjects();
    this.getTickets();
  }
  
  getTickets() {
    this.service.getTickets(this.userInfo.id).subscribe(
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

  getProjects() {
    this.service.getProjects().subscribe(
      (res: any) => {
        this.projectsList = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  deleteTicket(row) {
    this.service.deleteTicket(row).subscribe(res => {
      this.toastr.warning('Ticket deleted', 'Updated successfully');
      this.getTickets();
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
      this.toastr.success('Ticket status updated', 'Project status has been updated succesfully');
    });   
  }

  onProjectChange(event, element) {
    if (event.source.value !== element.ticketProject)
      element.ticketProject = event.source.value;

    this.service.updateTicket(element).subscribe(res => {
      this.toastr.success('Ticket project updated', 'Project status has been updated succesfully');
    });   
  }

  onOwnerChange(event, element) {
    if (event.source.value !== element.ticketOwner) {
      element.ticketOwnerID = event.source.value.id;
    }


    this.service.updateTicket(element).subscribe(res => {
      this.toastr.success('Ticket owner updated', 'Project owner has been updated succesfully');
    });   
  }

  compareOwners(o1: any, o2: any): boolean {
    return o1.userName === o2;
  }

  compareProjects(o1: any, o2: any): boolean {
    return o1.projectName === o2;
  }

  compareStatuses(o1: any, o2: any): boolean {
    return o1.statusName === o2.statusName && o1.statusID === o2.statusID;
  }

}
