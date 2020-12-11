import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { _MAT_HINT } from '@angular/material/form-field';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.less'],
  providers: [DatePipe]
})
export class CreateProjectComponent implements OnInit {

  projectModel : FormGroup;
  currentDate = new Date();
  userInfo = JSON.parse(localStorage.getItem('User'));

  constructor(private service: UserService, private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.setProjectForm();

  }

  setProjectForm() {

    this.projectModel = this.fb.group({
      projectName: '',
      description: '',
      createdBy: [null],
      createdOn: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'),
    });
  }

  createProject() {  
    this.projectModel.value.createdBy = this.userInfo.userName;
    
    this.service.createProject(this.projectModel).subscribe(res => {
      this.toastr.success('Project created!', 'Project succesfully added to projects repository.');
    });

    this.setProjectForm();
  }

}
