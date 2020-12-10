import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { _MAT_HINT } from '@angular/material/form-field';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.less'],
  providers: [DatePipe]
})
export class CreateTicketComponent implements OnInit {

  ticketModel : FormGroup;
  currentDate = new Date();
  statuses;
  userInfo = JSON.parse(localStorage.getItem('User'));
  usersList;
  projectsList;

  constructor(private service: UserService, private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.setTicketForm();
    this.getTicketStatuses();
    this.getUsers();
    this.getProjects();

  }

  setTicketForm() {

    this.ticketModel = this.fb.group({
      ticketName: '',
      ticketDescription: '',
      ticketOwnerID: [null],
      createdBy: [null],
      createdOn: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'),
      ticketStatusID: [null],
      ticketProjectID: [null]
    });
  }

  getTicketStatuses() {
    this.service.getTicketStatuses().subscribe(res => {
      this.statuses = res;
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

  createTicket() {  
    debugger;
    this.ticketModel.value.createdBy = this.userInfo.userName;
    
    this.service.createTicket(this.ticketModel).subscribe(res => {
      this.toastr.success('Ticket created!', 'Ticket succesfully added to tickets repository.');
    });

    this.ticketModel.reset();
  }


}
