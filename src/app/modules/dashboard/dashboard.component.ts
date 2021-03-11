import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less', '../../layouts/default/default.component.less']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
