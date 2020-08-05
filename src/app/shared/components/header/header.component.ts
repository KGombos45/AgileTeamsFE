import { Component, OnInit } from '@angular/core';
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
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
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
}
