import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {

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
    private fb : FormBuilder) { }

  ngOnInit(): void {

    this.getUserAccount(); 
    this.setUserAccountValues();

  }

  getUserAccount() {
    this.service.getUserAccount().subscribe(
      res => {
        this.userInfo = res;
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
      this.editModel.patchValue(data);
    });
    this.editModel.get('userName').disable();
  }

  updateUserAccount() {
    this.editModel.get('userName').enable();
    this.service.updateUserAccount(this.userInfo.id, this.editModel).subscribe(res => {
      this.toastr.success('User account infomation succesfully updated', 'Updated successfully');
    });
    
    this.editModel.reset();
    this.resetForm();

  }

  resetForm() {
    this.getUserAccount();
    this.setUserAccountValues();
  }
}
