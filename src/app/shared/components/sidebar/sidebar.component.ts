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
  subMenu: boolean;
  subLink: {
    path: string;
    title: string;
    icon: string;
  }
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', isAdminLink: false, isProjectManagerLink: false, subMenu: false, subLink: { 
    path: null, title: null, icon: null
   }},
  { path: '/manage-roles', title: 'Manage User Roles', icon: 'group_add', isAdminLink: true, isProjectManagerLink: false, subMenu: false, subLink: { 
    path: null, title: null, icon: null
   }},
  { path: '/manage-users', title: 'Manage Project Users', icon: 'people_alt', isAdminLink: false, isProjectManagerLink: true, subMenu: false, subLink: { 
    path: null, title: null, icon: null
   }},
  { path: '/create-project', title: 'Add New Project', icon: 'add', isAdminLink: true, isProjectManagerLink: true, subMenu: false, subLink: {
    path: null, title: null, icon: null
  }},
  { path: '/projects-list', title: 'Projects', icon: 'list', isAdminLink: false, isProjectManagerLink: false, subMenu: false, subLink: { 
    path: null, title: null, icon: null
   }},
  { path: '/workitems', title: 'Work Items', icon: 'code', isAdminLink: false, isProjectManagerLink: false, subMenu: true, subLink: { 
    path: '/myworkitems', title: 'My Work Items', icon: 'subdirectory_arrow_right'
   }},
  { path: '/tickets', title: 'Tickets', icon: 'bug_report', isAdminLink: false, isProjectManagerLink: false, subMenu: true, subLink: { 
    path: '/mytickets', title: 'My Tickets', icon: 'subdirectory_arrow_right'
   }},
  { path: '/user-profile/', title: 'User Profile', icon: 'person', isAdminLink: false, isProjectManagerLink: false, subMenu: false, subLink: { 
    path: null, title: null, icon: null
   }},
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  userInfo = JSON.parse(localStorage.getItem('User'));
  
  constructor(private router: Router, private service: UserService) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
   
  }

  isVisibleLink(menuItem, role) {
    if(menuItem.isAdminLink && !menuItem.isProjectManagerLink && role !== "Admin")
      return false;
    else if (menuItem.isProjectManagerLink && !menuItem.isAdminLink && role !== "Project Manager")
      return false;
    else if (menuItem.isProjectManagerLink && menuItem.isAdminLink && role === "Admin" || role === "Project Manager")
      return true;
    else
      return true;      
  }

}
