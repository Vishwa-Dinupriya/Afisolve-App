import {Component, OnInit, Input, OnChanges, AfterViewInit} from '@angular/core';
import {TaskService} from '../task.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
// import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';


export interface ITaskDetailsAccoor {
  taskID: number;
  contactNumber: number;
  task_description: string;
}
/*
export interface ITaskGeneral {
  taskID: number;
  developerEmail: string;
  deadline: string;
  task_description: string;
}*/

@Component({
  selector: 'app-task-profile',
  templateUrl: './task-profile.component.html',
  styleUrls: ['./task-profile.component.css']
})
export class TaskProfileComponent implements OnInit, AfterViewInit, OnChanges {
@Input() taskIDChild: number;

TASK_DETAILS_DATA: ITaskDetailsAccoor;
 // TASK_GENERAL_DATA: ITaskGeneral;
  taskIdAvailable;
  tabIndex;
//  editTaskForm: FormGroup;
 // edit = false;
//  editTaskFormCopy;
//  oldEmail;
  haveChanges = false;


  constructor(private http1: HttpClient,
              private fb1: FormBuilder,
              public taskService: TaskService, public dialog: MatDialog, private router: Router) { }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(): void {
    this.tabIndex = 0;
    if (this.taskIDChild) {
      this. taskIdAvailable = true;
      this.http1.post<any>(environment.accountCoordinatorApiUrl + `/get-selected-task-details`, {
        taskID: this.taskIDChild,
      })
        .subscribe(
          response => {
            this.TASK_DETAILS_DATA = response.data;
            console.log(this.TASK_DETAILS_DATA);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.taskIdAvailable = false;
    }
   // this.formBuildFunction();
  //  this.getAndSetValues();
  }
  ngOnInit(): void {
    this.tabIndex = 1;
    // this.formBuildFunction();
    if (!this.taskIDChild) {
      this.taskIdAvailable = false;
    }
  }
  ngAfterViewInit(): void {}
  public backToAllTasks(): void {
    this.taskService.ChangeTaskProfileModeBooleanSubjectValue(false);
    this.taskService.ChangeTaskIDSubjectNumberValue(null);
  }
 /* public saveChangesDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
        data: {
          title: 'Are you sure?',
          message: 'Save changes? ',
          name: '',
          button1: 'Cancel',
          button2: 'Continue'
        }
      });
    dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          console.log(`Dialog result: ${result}`);
          this.onUpdate();
        } else {
          console.log(`Dialog result: ${result}`);
        }
      });
  }

  onUpdate(): void {
    const taskForm = this.editTaskForm.value;
  //  registrationForm.firstName = this.capitalize(this.firstName.value);
  //  registrationForm.lastName = this.capitalize(this.lastName.value);
    this.http1.post<any>(environment.accountCoordinatorApiUrl + '/edit-task-details', {
      taskNewData: this.editTaskForm.value,
      // emailOld: this.oldEmail,
     // newProfilePhoto_: this.newProfilePicture,

    }).subscribe(
      response => {
        console.log('Update Success!(frontend)', response);
        this.edit = false;
        this.getAndSetValues();
      },
      error => {
        console.error('Update Error!(frontend)', error);
      }
    );
  }

  getAndSetValues(): void {
    if (this.taskIDChild) {
      this.http1.post<any>(environment.accountCoordinatorApiUrl + `/get-edit-task-details`, {taskID: this.taskIDChild})
        .subscribe(
          response => {
            this.developerEmail.setValue(response.developerEmail);
            this.deadline.setValue(response.deadline);
            this.description.setValue(response.task_description);
            this.createFormCopy();
            this.subscribeToFormValChange();

            this.TASK_GENERAL_DATA =  response.data;
            // this.dataSource = new MatTableDataSource<IUserGeneral>(this.USER_GENERAL_DATA);
          },
          error => {
            console.log(error);
          }
        );
    }

  }
  formBuildFunction(): void {
    this.editTaskForm = this.fb1.group({
      description: ['', [Validators.required, Validators.minLength(3)]],
      deadline: ['', [Validators.required]],
      developerEmail: ['', [Validators.required, Validators.email]],
    });
  }
  get developerEmail(): AbstractControl {
    return this.editTaskForm.get('developerEmail');
  }

  get deadline(): AbstractControl {
    return this.editTaskForm.get('deadline');
  }

  get description(): AbstractControl {
    return this.editTaskForm.get('description');
  }
  createFormCopy(): void {
    this.editTaskFormCopy = Object.assign({}, this.editTaskForm.value);
 //   this.oldEmail = this.editTaskFormCopy.developerEmail;
    console.log('init form copy ');
    console.log(this.editTaskFormCopy);
    this.haveChanges = null;
    console.log('have changes ? ' + this.haveChanges);

  }
  subscribeToFormValChange(): void {
    if (this.editTaskFormCopy) {
      this.editTaskForm.valueChanges.subscribe(value => {
        if (this.editTaskFormCopy.deadline !== value.deadline ||
          this.editTaskFormCopy.description !== value.task_description ||
          this.editTaskFormCopy.developerEmail !== value.developerEmail) {
          this.haveChanges = true;
          console.log('have changes? ' + this.haveChanges);
        } else {
          this.haveChanges = false;
          console.log('have changes? ' + this.haveChanges);
        }
        console.log('valid ? ' + this.editTaskForm.valid);
      });
    }
  }
  onCancelEdit(): void {
    this.edit = !this.edit;
    this.editTaskForm.reset();
    this.editTaskForm.setValue(this.editTaskFormCopy);
    }
    */
}
