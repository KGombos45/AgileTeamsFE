import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { UserProfileComponent } from '../../modules/user-profile/user-profile.component';
import { ManageRolesComponent } from '../../modules/manage-roles/manage-roles.component';
import { ProjectsComponent } from '../../modules/projects/projects.component';
import { CreateProjectComponent } from '../../modules/projects/create-project/create-project.component'
import { TicketsComponent } from '../../modules/tickets/tickets.component';
import { CreateTicketComponent } from '../../modules/tickets/create-ticket/create-ticket.component'
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


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    UserProfileComponent,
    ManageRolesComponent,
    ProjectsComponent,
    CreateProjectComponent,
    TicketsComponent,
    CreateTicketComponent
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
    MatNativeDateModule  
  ],
  entryComponents: [UserProfileComponent]
})
export class DefaultModule { }
