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
import { UserProfileViewComponent } from './modules/user-profile/user-profile-view/user-profile-view.component';
import { ManageRolesComponent } from './modules/manage-roles/manage-roles.component';
import { WorkItemsComponent } from './modules/workitems/workitems.component';
import { TicketsComponent } from './modules/tickets/tickets.component';
import { CreateWorkItemComponent } from './modules/workitems/create-workitem/create-workitem.component';
import { CreateTicketComponent } from './modules/tickets/create-ticket/create-ticket.component';
import { WorkItemViewComponent } from './modules/workitems/workitem-view/workitem-view.component';
import { TicketViewComponent } from './modules/tickets/ticket-view/ticket-view.component';
import { CreateProjectComponent } from './modules/projects/create-project/create-project.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { ProjectViewComponent } from './modules/projects/project-view/project-view.component';
import { MyWorkItemsComponent } from './modules/workitems/my-work-items/my-work-items.component';
import { MyTicketsComponent } from './modules/tickets/my-tickets/my-tickets.component';
import { DemoComponent } from './user/demo/demo.component';


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
      },
      {
        path: 'demo',
        component: DemoComponent
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
        path: 'user-profile-view',
        component: UserProfileViewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-roles',
        component: ManageRolesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create-project',
        component: CreateProjectComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'projects-list',
        component: ProjectsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project-view',
        component: ProjectViewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'workitems',
        component: WorkItemsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'myworkitems',
        component: MyWorkItemsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'workitem-view',
        component: WorkItemViewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create-workitem',
        component: CreateWorkItemComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'tickets',
        component: TicketsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'mytickets',
        component: MyTicketsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'ticket-view',
        component: TicketViewComponent,
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
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: []
})
export class AppRoutingModule { }
