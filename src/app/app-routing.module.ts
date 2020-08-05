import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { DefaultComponent } from './layouts/default/default.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';
import { ManageRolesComponent } from './modules/manage-roles/manage-roles.component';
import { ManageUsersComponent } from './modules/manage-users/manage-users.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { TicketsComponent } from './modules/tickets/tickets.component';
import { CreateProjectComponent } from './modules/projects/create-project/create-project.component';
import { CreateTicketComponent } from './modules/tickets/create-ticket/create-ticket.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: '/user/login', 
    pathMatch: 'full' 
  },
  {
    path: 'user', 
    component: UserComponent,
    children: [
      { 
        path: 'registration', 
        component: RegistrationComponent 
      },
      { 
        path: 'login', 
        component: LoginComponent
      }     
    ]
  },
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-roles',
        component: ManageRolesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'myprojects',
        component: ProjectsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create-project',
        component: CreateProjectComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'mytickets',
        component: TicketsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create-ticket',
        component: CreateTicketComponent,
        canActivate: [AuthGuard]
      },
    ]


  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule { }
