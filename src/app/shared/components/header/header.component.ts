import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  userInfo;

  constructor(private router: Router, private service: UserService) { }

  ngOnInit(): void {
    this.getUserAccount();
    // this.getUserAccountAndRole();
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  getUserAccount() {
    this.service.getUserAccount().subscribe(
      res => {
        debugger;
        this.userInfo = res;
        localStorage.setItem('User', JSON.stringify(this.userInfo));
      },
      err => {
        console.log(err);
      },
    );
  }

  // getUserAccountAndRole() {
  //   this.service.getUserAccountAndRole().subscribe(
  //     res => {        
  //       debugger;
  //       localStorage.setItem('UserAccountAndRole', JSON.stringify(res));
  //     },
  //     err => {
  //       console.log(err);
  //     },
  //   );
  // }
}
