import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  
  @Output() toggleNav: EventEmitter<boolean> = new EventEmitter();
  @Input() isOpen: boolean;
  userInfo;

  constructor(private router: Router, private service: UserService) { }

  ngOnInit(): void {
    this.getUserAccount();
  }

  toggleSideNav() {
    this.toggleNav.emit(true);
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  getUserAccount() {
    this.service.getUserAccount().subscribe(
      res => {
        this.userInfo = res;
        localStorage.setItem('User', JSON.stringify(this.userInfo));
      },
      err => {
        console.log(err);
      },
    );
  }
}
