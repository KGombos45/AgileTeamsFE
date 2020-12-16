import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.less']
})
export class ManageRolesComponent implements OnInit {

  constructor(private service: UserService, private formBuilder: FormBuilder, private dialog: MatDialog, private toastr: ToastrService, private router: Router) { }

  roles = [];

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'email', 'role', 'actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  searchKey: string;

  ngOnInit(): void {

    this.getUsers();
    this.getRoles();  
  }


  getUsers() {
    this.service.getUsers().subscribe(
      (res: any) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        console.log(err);
      },
    );
  }

  getRoles() {
    this.service.getRoles().subscribe(
      res => {
        this.roles = res as [];
      },
      err => {
        console.log(err);
      },
    );
  }

  onRoleChange(event, element) {
    if (event.source.value !== element.role) {
      element.isRoleChanged = true;
      element.role = event.source.value
    }
    return element;
  }

  deleteUser(row) {
    this.service.deleteUserAccount(row.id, row).subscribe(res => {
      this.toastr.warning('User account deleted', 'Updated successfully');
      this.getUsers();
    });    
    
    this.table.renderRows();
  }


  updateRole(row) {
    row.isRoleChanged = false;
    debugger;
    this.service.updateUserRoles(row.id, row).subscribe(res => {
      this.toastr.success('User role succesfully updated', 'Updated successfully');
    });   
  }

  viewUserProfile(element) {

    this.service.setProfileUserID(element);
    
    this.router.navigate(['/user-profile-view']);
  }

}
