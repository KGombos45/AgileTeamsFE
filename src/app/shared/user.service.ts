import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  readonly BaseURI = 'https://localhost:44332/api';


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

  updateUserAccount(id, editModel) {
    return this.http.put(this.BaseURI+'/UserAccount/' + id, editModel.value);
  }

  deleteUserAccount(id, row) {
    return this.http.post(this.BaseURI+'/Administration/DeleteUser/' + id, row);
  }

  getProjects() {
    return this.http.get(this.BaseURI+'/Project/Projects');
  }

  getProjectStatuses() {
    return this.http.get(this.BaseURI+'/Project/Statuses');
  }

  createProject(projectModel) {
    return this.http.post(this.BaseURI+'/Project/Create', projectModel.value)
  }

  updateProject(element) {
    return this.http.put(this.BaseURI+'/Project/UpdateProject', element);
  }

  deleteProject(row) {
    return this.http.post(this.BaseURI+'/Project/DeleteProject', row);
  }
  
}
