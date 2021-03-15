import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface User {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  about: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private fb: FormBuilder, private http: HttpClient) { }
  //readonly BaseURI = 'https://localhost:44332/api';
  readonly BaseURI = 'https://https://agileteams.azurewebsites.net/api';
  
  workItem = [];
  ticket = [];
  project = [];


  registrationModel = this.fb.group({
    UserName :['', Validators.required],
    Email :['', [Validators.required, Validators.email]],
    FirstName :['', Validators.required],
    LastName :['', Validators.required],
    Passwords : this.fb.group({
      Password :['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword :['', [Validators.required, Validators.minLength(4)]]
    }, {validator: this.comparePasswords})
  });


  comparePasswords(fb: FormGroup) {
    let confirmPasswordCtrl = fb.get('ConfirmPassword');

    // Check if required or minlength errors are null, then throw error for mismatching passwords if passwords do not match
    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
      if (fb.get('Password').value != confirmPasswordCtrl.value) 
        confirmPasswordCtrl.setErrors({ passwordMismatch: true});
      else
        confirmPasswordCtrl.setErrors(null);      
    }
  }

  register() {
    var body = {
      UserName: this.registrationModel.value.UserName,
      Email: this.registrationModel.value.Email,
      FirstName: this.registrationModel.value.FirstName,
      LastName: this.registrationModel.value.LastName,
      Password: this.registrationModel.value.Passwords.Password
    };

    return this.http.post(this.BaseURI+'/ApplicationUser/Register', body);

  }

  login(formData) {
    return this.http.post(this.BaseURI+'/ApplicationUser/Login', formData);
  }

  setWorkItem(data) {
    localStorage.setItem('WorkItem', JSON.stringify(data));
  }

  getWorkItem() {
    return JSON.parse(localStorage.getItem('WorkItem'));
  }

  setProject(data) {
    localStorage.setItem('Project', JSON.stringify(data));
  }

  getProject() {
    return JSON.parse(localStorage.getItem('Project'));
  }

  setTicket(data) {
    localStorage.setItem('Ticket', JSON.stringify(data));
  }

  getTicket() {
    return JSON.parse(localStorage.getItem('Ticket'));
  }

  setProfileUserID(data) {
    localStorage.setItem('UserID', JSON.stringify(data));
  }

  getProfileUserID() {
    return JSON.parse(localStorage.getItem('UserID'));
  }

  getUsers() {
    return this.http.get(this.BaseURI+'/Administration/Users');
  }

  getRoles() {
    return this.http.get(this.BaseURI+'/Administration/Roles');
  }

  updateUserRoles(id, row) {
    return this.http.put(this.BaseURI+'/Administration/UpdateRole/' + id, row);
  }

  getUserAccount() {
    return this.http.get(this.BaseURI+'/UserAccount');
  }

  getUserAccountView(userId) {
    return this.http.get(this.BaseURI+'/UserAccount/GetProjectUserProfile/'+ userId);
  }

  updateUserAccount(id, editModel) {
    return this.http.put(this.BaseURI+'/UserAccount/' + id, editModel.value);
  }

  deleteUserAccount(id, row) {
    return this.http.post(this.BaseURI+'/Administration/DeleteUser/' + id, row);
  }

  createProject(projectModel) {
    return this.http.post(this.BaseURI+'/Project/Create', projectModel.value)
  }

  getProjects() {
    return this.http.get(this.BaseURI+'/Project/Projects');
  }

  updateProject(projectModel) {
    return this.http.put(this.BaseURI+'/Project/UpdateProject', projectModel.value);
  }


  deleteProject(row) {
    return this.http.post(this.BaseURI+'/Project/DeleteProject', row);
  }

  getWorkItems() {
    return this.http.get(this.BaseURI+'/WorkItem/WorkItems');
  }

  getWorkItemsStatusCount() {
    return this.http.get(this.BaseURI+'/WorkItem/GetWorkItemStatusCount');
  }

  getWorkItemsPriorityCount() {
    return this.http.get(this.BaseURI+'/WorkItem/GetWorkItemPriorityCount');
  }

  getWorkItemOwnerCount() {
    return this.http.get(this.BaseURI+'/WorkItem/GetWorkItemOwnerCount');
  }

  getTicketTypeCount() {
    return this.http.get(this.BaseURI+'/Ticket/GetTicketTypeCount');
  }

  getTicketStatusCount() {
    return this.http.get(this.BaseURI+'/Ticket/GetTicketStatusCount');
  }
  
  getTicketOwnerCount() {
    return this.http.get(this.BaseURI+'/Ticket/GetTicketOwnerCount');
  }

  getWorkItemUsers(workItem) {
    return this.http.post(this.BaseURI+'/WorkItem/Users/' + workItem.workItemID, workItem);
  }

  getUserWorkItems(userId) {
    return this.http.get(this.BaseURI+'/WorkItem/WorkItems/' + userId);
  }


  getWorkItemStatuses() {
    return this.http.get(this.BaseURI+'/WorkItem/Statuses');
  }

  getWorkItemTypes() {
    return this.http.get(this.BaseURI+'/WorkItem/Types');
  }

  getWorkItemPriorities() {
    return this.http.get(this.BaseURI+'/WorkItem/Priorities');
  }

  getTicketStatuses() {
    return this.http.get(this.BaseURI+'/Ticket/Statuses');
  }

  getTicketTypes() {
    return this.http.get(this.BaseURI+'/Ticket/Types');
  }

  createWorkItem(workItemModel) {
    return this.http.post(this.BaseURI+'/WorkItem/Create', workItemModel.value);
  }

  createWorkItemComment(workItemComment) {
    return this.http.post(this.BaseURI+'/WorkItem/AddComment', workItemComment);
  }

  updateWorkItem(element) {
    return this.http.put(this.BaseURI+'/WorkItem/UpdateWorkItem', element);
  }

  deleteWorkItem(row) {
    return this.http.post(this.BaseURI+'/WorkItem/DeleteWorkItem', row);
  }

  getTickets() {

    return this.http.get(this.BaseURI+'/Ticket/Tickets');

  }

  getUserTickets(userId) {

    return this.http.get(this.BaseURI+'/Ticket/Tickets/' + userId);

  }

  createTicket(ticketModel) {
    return this.http.post(this.BaseURI+'/Ticket/Create', ticketModel.value)
  }

  updateTicket(element) {
    return this.http.put(this.BaseURI+'/Ticket/UpdateTicket', element);
  }


  deleteTicket(row) {
    return this.http.post(this.BaseURI+'/Ticket/DeleteTicket', row);
  }
  
}
