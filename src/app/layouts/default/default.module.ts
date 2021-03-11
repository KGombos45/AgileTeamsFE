import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { UserProfileComponent } from '../../modules/user-profile/user-profile.component';
import { UserProfileViewComponent } from '../../modules/user-profile/user-profile-view/user-profile-view.component';
import { ManageRolesComponent } from '../../modules/manage-roles/manage-roles.component';
import { WorkItemsComponent } from '../../modules/workitems/workitems.component';
import { CreateWorkItemComponent } from '../../modules/workitems/create-workitem/create-workitem.component'
import { WorkItemViewComponent } from '../../modules/workitems/workitem-view/workitem-view.component';
import { MyWorkItemsComponent } from '../../modules/workitems/my-work-items/my-work-items.component';
import { TicketViewComponent } from '../../modules/tickets/ticket-view/ticket-view.component';
import { TicketsComponent } from '../../modules/tickets/tickets.component';
import { MyTicketsComponent } from '../../modules/tickets/my-tickets/my-tickets.component';
import { CreateTicketComponent } from '../../modules/tickets/create-ticket/create-ticket.component'
import { CreateProjectComponent } from '../../modules/projects/create-project/create-project.component';
import { ProjectsComponent } from '../../modules/projects/projects.component';
import { ProjectViewComponent } from '../../modules/projects/project-view/project-view.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface,PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    UserProfileComponent,
    UserProfileViewComponent,
    ManageRolesComponent,
    WorkItemsComponent,
    CreateWorkItemComponent,
    WorkItemViewComponent,
    TicketsComponent,
    CreateTicketComponent,
    TicketViewComponent,
    ProjectsComponent,
    CreateProjectComponent,    
    ProjectViewComponent,
    MyWorkItemsComponent,
    MyTicketsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PerfectScrollbarModule  
  ],
  providers:[{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
}],
  entryComponents: [UserProfileComponent]
})
export class DefaultModule { }
