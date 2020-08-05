import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  isAdminLink: boolean;
  isProjectManagerLink: boolean;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', isAdminLink: false, isProjectManagerLink: false},
  { path: '/manage-roles', title: 'Manage User Roles', icon: 'group_add', isAdminLink: true, isProjectManagerLink: false},
  { path: '/manage-users', title: 'Manage Project Users', icon: 'people_alt', isAdminLink: false, isProjectManagerLink: true},
  { path: '/myprojects', title: 'My Projects', icon: 'code', isAdminLink: false, isProjectManagerLink: false},
  { path: '/mytickets', title: 'My Tickets', icon: 'bug_report', isAdminLink: false, isProjectManagerLink: false},
  { path: '/user-profile/', title: 'User Profile', icon: 'person', isAdminLink: false, isProjectManagerLink: false}
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  userInfo;

  constructor(private router: Router, private service: UserService) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.getUserAccount();    
  }

  isVisibleLink(menuItem, role) {
    if(menuItem.isAdminLink && role !== "Admin")
      return false;
    else if (menuItem.isProjectManagerLink && role !== "Project Manager")
      return false;
    else
      return true;      
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
