import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, User } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.less', '../../../layouts/default/default.component.less']
})
export class UserProfileViewComponent implements OnInit {
  
  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  displayedColumns: string[] = ['workItemName', 'workItemStatusName', 'workItemPriorityName', 'workItemProject', 'createdBy'];
  displayedColumns2: string[] = ['ticketName', 'ticketStatusName', 'ticketTypeName', 'ticketWorkItemName'];    
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  userInfo;
  editModel: FormGroup;
  user: any;
  userID;
  workItems;

  constructor(
    public service : UserService, 
    private toastr: ToastrService,
    private fb : FormBuilder,
    private router: Router) { }

    ngOnInit(): void {

      this.getUserAccount();
      this.getUserWorkItems();
      this.getUserTickets();
  
    }

    getUserAccount() {
      this.userID = this.service.getProfileUserID();

      this.service.getUserAccountView(this.userID).subscribe(
        res => {
          this.userInfo = res;
        },
        err => {
          console.log(err);
        },
      );
    }


    getUserWorkItems() {
      debugger;
      this.service.getUserWorkItems(this.userID).subscribe(
        (res: any) => {
          debugger;
          this.dataSource.data = res;
          this.dataSource.sort = this.sort;
        },
        err => {
          console.log(err);
        },
      );
    }

    getUserTickets() {
      this.service.getUserTickets(this.userID).subscribe(
        (res: any) => {
          this.dataSource2.data = res;
          this.dataSource2.sort = this.sort;
        },
        err => {
          console.log(err);
        },
      );
    }


    viewWorkItem(element) {

      debugger;
      this.service.setWorkItem(element);
  
      this.router.navigate(['/workitem-view']);
    }

    viewWorkItemTicket(ticket) {

      this.service.setTicket(ticket);
  
      this.router.navigate(['/ticket-view']);
    }

}
