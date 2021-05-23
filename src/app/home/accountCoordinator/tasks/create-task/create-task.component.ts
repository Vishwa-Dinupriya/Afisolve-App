import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../task.service';
import {HttpClient} from '@angular/common/http';
import {DialogBoxComponent} from '../../../../shared/dialog-box/dialog-box.component';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  @ViewChild('myForm') myForm;
  developerEmailList;
  developerNameList;
  complaintIDList;
  subComplaintIDList;

  createTaskForm: FormGroup;
  constructor(private fb1: FormBuilder,
              private taskService: TaskService,
              private http1: HttpClient,
              private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.createTaskForm = this.fb1.group({
      complaintID: ['', [Validators.required]],
      subComplaintID: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      task_description: ['', [Validators.minLength(10), Validators.required]],
     developerEmail: ['', [Validators.required]],
     // developerID: ['', [Validators.required]],
    });
    this.http1.post<any>(environment.accountCoordinatorApiUrl + '/get-DeveloperList', {}).subscribe(
      response => {
        this.developerEmailList = response.data.map(value => value.developerEmail);
        this.developerNameList = response.data.map(value => value.developerName);
        }, error => {
        console.log(error);
      }
    );
    this.http1.post<any>(environment.accountCoordinatorApiUrl + '/get-complaintIDlist', {}).subscribe(
      response => {
        this.complaintIDList = response.data.map(value => value.complaintID);
      }, error => {
        console.log(error);
      }
    );
    this.http1.post<any>(environment.accountCoordinatorApiUrl + '/get-subComplaintIDlist', {}).subscribe(
      response => {
        this.subComplaintIDList = response.data.map(value => value.subComplaintID);
      }, error => {
        console.log(error);
      }
    );
  }
  onSubmit(): void {
    const dialogRef1 = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Are you sure you want to create this task ?',
        message: 'Please Confirm! ',
        name: ' ',
        button1: 'No',
        button2: 'Yes'
      }
    });

    dialogRef1.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(this.createTaskForm.value);
        this.taskService.createtask(this.createTaskForm.value)
          .subscribe(
            response => {
              const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  title: 'Success!',
                  message: 'You have successfully created a task',
                  name: ' ',
                  button1: 'Back to tasks',
                  button2: 'Ok'
                }
              });

              dialogRef2.afterClosed().subscribe(result2 => {
                console.log(`Dialog result: ${result}`);
                this.myForm.resetForm();
                if (result2 === true) {

                } else {
                  this.taskService.ChangeCreateTaskModeBooleanSubjectValue(false);
                }
              });
            },
            error => {console.error('Error!(frontend)', error);
                      const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  title: 'Failed! Please try again.',
                  message: 'Please make sure the details you entered are valied. ',
                  name: ' ',
                  button1: '',
                  button2: 'Ok'
                }
              }); }
          );
      } else {
        this.taskService.ChangeCreateTaskModeBooleanSubjectValue(false);
      }
    });
  }

}

