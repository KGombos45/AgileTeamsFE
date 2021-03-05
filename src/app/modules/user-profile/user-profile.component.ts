import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, User } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less', '../../layouts/default/default.component.less']
})
export class UserProfileComponent implements OnInit {

  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  displayedColumns: string[] = ['workItemName', 'workItemStatusName', 'workItemPriorityName', 'workItemProject', 'createdBy'];
  displayedColumns2: string[] = ['ticketName', 'ticketStatusName', 'ticketTypeName', 'ticketWorkItemName'];    
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  userInfo;
  editModel: FormGroup;
  user: any;
  
  constructor(
    public service : UserService, 
    private toastr: ToastrService,
    private fb : FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    this.getUserAccount();
    this.setUserAccountValues();

  }

  getUserAccount() {
    this.service.getUserAccount().subscribe(
      res => {
        this.userInfo = res;
        this.getUserWorkItems(this.userInfo.id);
        this.getUserTickets(this.userInfo.id);
      },
      err => {
        console.log(err);
      },
    );
  }

  setUserAccountValues() {

    this.editModel = this.fb.group({
      firstName: [null],
      lastName: [null],
      email: [null, [Validators.required, Validators.email]],
      userName: [null],
      address: [null],
      city: [null],
      state: [null],
      zip: [null],
      about: [null]
    });

    this.service.getUserAccount().toPromise().then(data => {
      debugger;
      this.editModel.patchValue(data);
    });
    this.editModel.get('userName').disable();
  }

  getUserWorkItems(userId) {
    this.service.getUserWorkItems(userId).subscribe(
      (res: any) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err);
      },
    );
  }

  getUserTickets(userId) {
    this.service.getUserTickets(userId).subscribe(
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

  updateUserAccount() {
    this.editModel.get('userName').enable();
    this.service.updateUserAccount(this.userInfo.id, this.editModel).subscribe(res => {
      this.toastr.success('User account infomation succesfully updated', 'Updated successfully');
    });    

    this.resetForm();

  }

  resetForm() {
    setTimeout(() => this.setUserAccountValues(),800); 

  }
}
