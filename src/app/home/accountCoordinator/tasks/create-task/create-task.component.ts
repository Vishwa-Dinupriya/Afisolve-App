import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../task.service';
import {HttpClient} from '@angular/common/http';
import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';
import {MatDialog} from '@angular/material/dialog';




@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  @ViewChild('myForm') myForm;

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
      task_description: ['', [Validators.required]],
     // accountCoordinatorEmail: ['', [Validators.required]],
      developerEmail: ['', [Validators.required]],
    });
  }
  onSubmit(): void {
    const dialogRef1 = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Confirm form submission!',
        message: 'Do you want to create this task ? ',
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
            error => console.error('Error!(frontend)', error)
          );
      } else {
        this.taskService.ChangeCreateTaskModeBooleanSubjectValue(false);
      }
    });
  }

}

