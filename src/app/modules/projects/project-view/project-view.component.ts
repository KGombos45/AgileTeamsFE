import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { _MAT_HINT } from '@angular/material/form-field';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.less'],
  providers: [DatePipe]
})
export class ProjectViewComponent implements OnInit {

  project: any = [];
  projectModel: FormGroup;


  constructor(private service: UserService, private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProject();
    this.setProjectValues();
  }

  getProject() {
    this.project = this.service.getProject();
  }

  setProjectValues() {

    this.projectModel = this.fb.group({
      projectID: [null],
      projectName: [null],
      description: [null],
      createdOn: [null],
      createdBy: [null]
    });
     
    this.projectModel.patchValue(this.project);

  }

  updateProject() {
    this.service.updateProject(this.projectModel).subscribe(res => {
      this.toastr.success('Project infomation succesfully updated', 'Updated successfully');
    });    

    this.project = this.projectModel.value;
    this.resetForm();

  }

  resetForm() {
    setTimeout(() => this.setProjectValues(),800); 

  }

}
