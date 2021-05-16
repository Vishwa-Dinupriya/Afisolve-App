import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DevtaskService} from '../devtask.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-update-devtask-status',
  templateUrl: './update-devtask-status.component.html',
  styleUrls: ['./update-devtask-status.component.css']
})
export class UpdateDevtaskStatusComponent implements OnInit {
  @ViewChild('myForm') myForm;
  taskStatusList = ['InProgress', 'Completed'];
  taskIDList;

  updateDevTaskStatusForm: FormGroup;

  constructor(
    private fb1: FormBuilder,
    private devtaskService: DevtaskService,
    private http1: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.updateDevTaskStatusForm = this.fb1.group({
      taskID: ['', [Validators.required]],
      task_status: ['', [Validators.required]],
    });
    this.http1.post<any>(environment.developerApiUrl + '/get-Task-All-details', {}).subscribe(
      response => {
        this.taskIDList = response.data.map(value => value.taskID);
      }, error => {
        console.log(error);
      }
    );
  }
  onSubmit(): void {
    const dialogRef1 = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Confirm form submission!',
        message: 'Do you want to update status ? ',
        name: ' ',
        button1: 'No',
        button2: 'Yes'
      }
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(this.updateDevTaskStatusForm.value);
        this.devtaskService.updatetaskstatus(this.updateDevTaskStatusForm.value)
          .subscribe(
            response => {
              const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  title: 'Success!',
                  message: 'You have successfully updated a task status',
                  name: ' ',
                  button1: 'Back to tasks',
                  button2: 'Ok'
                }
              });
              dialogRef2.afterClosed().subscribe(result2 => {
                console.log(`Dialog result: ${result}`);
                this.myForm.resetForm();
                if (result2 === true) {

                }});
            },
            error => {console.error('Error!(frontend)', error);
              const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  title: 'Failed! Please try again.',
                  message: 'Please make sure the details you entered are valied. ',
                  name: ' ',
                  button1: 'Back',
                  button2: 'Ok'
                }
              }); }
          );
      }});
  }


}
