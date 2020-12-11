import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { _MAT_HINT } from '@angular/material/form-field';


@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.less'],
  providers: [DatePipe]
})
export class TicketViewComponent implements OnInit {

  ticketModel : FormGroup;
  currentDate = new Date();
  statuses;
  types;
  userInfo = JSON.parse(localStorage.getItem('User'));
  usersList;
  workItemsList;
  ticket: any = [];

  constructor(private service: UserService, private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) { }


  ngOnInit(): void {

    this.getTicket();
    this.setTicketForm();
    this.getTicketStatuses();
    this.getTicketTypes();
    this.getUsers();
    this.getWorkItems();

  }

  getTicket() {
    this.ticket = this.service.getTicket();
  }

  setTicketForm() {

    this.ticketModel = this.fb.group({
      ticketID: [null],
      ticketName: '',
      ticketDescription: '',
      ticketOwnerID: [null],
      createdBy: [null],
      createdOn: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'),
      ticketStatusID: [null],
      ticketTypeID: [null],
      ticketWorkItemID: [null]
    });

    this.ticketModel.patchValue(this.ticket);
  }

  getTicketStatuses() {
    this.service.getTicketStatuses().subscribe(res => {
      this.statuses = res;
    });
  }

  getTicketTypes() {
    this.service.getTicketTypes().subscribe(res => {
      this.types = res;
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

  updateTicket() {
    this.service.updateTicket(this.ticketModel.value).subscribe(res => {
      this.toastr.success('Ticket infomation succesfully updated', 'Updated successfully');
    });    

    this.ticket = this.ticketModel.value;
    this.resetForm();

  }

  resetForm() {
    setTimeout(() => this.setTicketForm(),800); 

  }

}
