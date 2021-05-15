import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-assign-new-developer',
  templateUrl: './assign-new-developer.component.html',
  styleUrls: ['./assign-new-developer.component.css']
})
export class AssignNewDeveloperComponent implements OnInit {
  @ViewChild('myForm') myForm;
  updateDeveloperForm: FormGroup;
  constructor(
    private fb1: FormBuilder,
    private taskService: TaskService,
    private http1: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.updateDeveloperForm = this.fb1.group({
      taskID: ['', [Validators.required]],
      developerEmail: ['', [Validators.email, Validators.required]],
      deadline: ['', [Validators.required]],
    });
  }
  onSubmit(): void {
    const dialogRef1 = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Confirm form submission!',
        message: 'Do you want to update developer ? ',
        name: ' ',
        button1: 'No',
        button2: 'Yes'
      }
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(this.updateDeveloperForm.value);
        this.taskService.updateDeveloper(this.updateDeveloperForm.value)
          .subscribe(
            response => {
              const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  title: 'Success!',
                  message: 'You have successfully updated developer',
                  name: ' ',
                  button1: 'Back to complaints',
                  button2: 'Ok'
                }
              });

              dialogRef2.afterClosed().subscribe(result2 => {
                console.log(`Dialog result: ${result}`);
                this.myForm.resetForm();
                if (result2 === true) {

                } else {
                  this.taskService.ChangeCreateTaskModeBooleanSubjectValue(true);
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
        this.taskService.ChangeCreateTaskModeBooleanSubjectValue(true);
      }
    });
  }

}
