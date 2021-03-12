import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/user.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less', '../../layouts/default/default.component.less']
})
export class DashboardComponent implements OnInit {

  workItems;
  workItemStatus = [];
  workItemPriority = [];
  workItemOwner = [];
  ticketStatus = [];
  ticketType = [];
  ticketOwner = [];

  donutOptions = {
    pieHole: 0.4
  };

  filtersLoaded: Promise<boolean>;
  // serviceSubscription: Subscription;


  workItemColumns = ['Work Item Owner', 'Work Items'];
  ticketColumsn = ['Ticket Owner', 'Tickets'];

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.getWorkItemsStatusCount();
    this.getWorkItemsPriorityCount();
    this.getWorkItemsOwnerCount();
    this.getTicketTypeCount();
    this.getTicketStatusCount();
    this.getTicketOwnerCount();
  }

  getWorkItemsStatusCount() {
    this.service.getWorkItemsStatusCount().subscribe(
      (res: any) => {
        this.workItemStatus = res;
        this.filtersLoaded = Promise.resolve(true);
      },
      err => {
        console.log(err);
      },
    );
  }

  getWorkItemsPriorityCount() {
    this.service.getWorkItemsPriorityCount().subscribe(
      (res: any) => {
        this.workItemPriority = res;
        this.filtersLoaded = Promise.resolve(true);
      },
      err => {
        console.log(err);
      },
    );
  }

  getWorkItemsOwnerCount() {
    this.service.getWorkItemOwnerCount().subscribe(
      (res: any) => {
        this.workItemOwner = res;
        this.filtersLoaded = Promise.resolve(true);
      },
      err => {
        console.log(err);
      },
    );
  }

  getTicketTypeCount() {
    this.service.getTicketTypeCount().subscribe(
      (res: any) => {
        this.ticketType = res;
        this.filtersLoaded = Promise.resolve(true);
      },
      err => {
        console.log(err);
      },
    );
  }

  getTicketStatusCount() {
    this.service.getTicketStatusCount().subscribe(
      (res: any) => {
        this.ticketStatus = res;
        this.filtersLoaded = Promise.resolve(true);
      },
      err => {
        console.log(err);
      },
    );
  }

  getTicketOwnerCount() {
    this.service.getTicketOwnerCount().subscribe(
      (res: any) => {
        this.ticketOwner = res;
        this.filtersLoaded = Promise.resolve(true);
      },
      err => {
        console.log(err);
      },
    );
  }


  // ngOnDestroy() {
  //   this.serviceSubscription.unsubscribe();
  // }


}
