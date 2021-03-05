import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { _MAT_HINT } from '@angular/material/form-field';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.less', '../../../layouts/default/default.component.less'],
  providers: [DatePipe]
})
export class CreateTicketComponent implements OnInit {

  ticketModel : FormGroup;
  currentDate = new Date();
  statuses;
  types;
  userInfo = JSON.parse(localStorage.getItem('User'));
  usersList;
  workItemsList;

  constructor(private service: UserService, private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.setTicketForm();
    this.getTicketStatuses();
    this.getTicketTypes();
    this.getUsers();
    this.getWorkItems();

  }

  setTicketForm() {

    this.ticketModel = this.fb.group({
      ticketName: '',
      ticketDescription: '',
      ticketOwnerID: [null],
      createdBy: [null],
      createdOn: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'),
      ticketStatusID: [null],
      ticketTypeID: [null],
      ticketWorkItemID: [null]
    });
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

  createTicket() {  
    this.ticketModel.value.createdBy = this.userInfo.userName;
    
    this.service.createTicket(this.ticketModel).subscribe(res => {
      this.toastr.success('Ticket created!', 'Ticket succesfully added to tickets repository.');
    });

    this.setTicketForm();
  }


}
