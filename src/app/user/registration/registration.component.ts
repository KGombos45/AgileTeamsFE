import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../users.component.less']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  hide = true;
  hideRequiredMarker = true;

  ngOnInit() {
    this.service.registrationModel.reset();
  }

  onSubmit(formDirective: FormGroupDirective) {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          formDirective.resetForm();
          this.service.registrationModel.reset();
          this.toastr.success('New user created!', 'Registration was succesful.');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken.', 'Registration failed.');
                break;            
              default:
                this.toastr.error(element.description, 'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
