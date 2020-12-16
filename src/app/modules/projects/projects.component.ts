import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.less'],
  providers: [DatePipe]
})
export class ProjectsComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['projectName', 'projectDescription', 'createdBy', 'createdOn', 'actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  currentDate = new Date();

  constructor(private service: UserService, private toastr: ToastrService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {

    this.getProjects();

  }

  getProjects() {
    this.service.getProjects().subscribe(
      (res: any) => {
        debugger;
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err);
      },
    );
  }

  
  deleteProject(row) {
    this.service.deleteProject(row).subscribe(res => {
      this.toastr.warning('Project deleted', 'Updated successfully');
      this.getProjects();
    });    
    
    this.table.renderRows();
  }

  
  viewProject(element) {

    this.service.setProject(element);

    this.router.navigate(['/project-view']);
  }

}
