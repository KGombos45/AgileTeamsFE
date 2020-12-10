import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.less'],
  providers: [DatePipe]
})
export class CreateProjectComponent implements OnInit {

  projectModel : FormGroup;
  currentDate = new Date();
  statuses;
  userInfo = JSON.parse(localStorage.getItem('User'));
  usersList;
  

  constructor(private service: UserService, private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.setProjectForm();
    this.getProjectStatuses();
    this.getUsers();

  }

  setProjectForm() {

    this.projectModel = this.fb.group({
      projectName: '',
      projectDescription: '',
      projectStatusID: [null],
      projectOwnerID: [null],
      createdOn: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'),
      createdBy: [null],
      startDate: [null],
      targetEndDate: [null]
    });
  }

  getProjectStatuses() {
    this.service.getProjectStatuses().subscribe(res => {
      this.statuses = res;
    });
  }

  getUsers() {
    this.service.getUsers().subscribe(
      res => {
        this.usersList = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  createProject() {  
    this.projectModel.value.createdBy = this.userInfo.userName;
    debugger;
    this.service.createProject(this.projectModel).subscribe(res => {
      this.toastr.success('Project created!', 'Project succesfully added to projects repository.');
    });

    this.projectModel.reset();
  }


}
