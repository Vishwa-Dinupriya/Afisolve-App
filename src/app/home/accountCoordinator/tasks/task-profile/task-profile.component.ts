import {Component, OnInit, Input, OnChanges, AfterViewInit} from '@angular/core';
import {TaskService} from '../task.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

export interface ITaskDetailsAccoor {
  taskID: number;
  contactNumber: number;
  task_description: string;
}

@Component({
  selector: 'app-task-profile',
  templateUrl: './task-profile.component.html',
  styleUrls: ['./task-profile.component.css']
})
export class TaskProfileComponent implements OnInit, AfterViewInit, OnChanges {
@Input() taskIDChild: number;

TASK_DETAILS_DATA: ITaskDetailsAccoor;
  taskIdAvailable;
  tabIndex;

  constructor(private http1: HttpClient,
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
  }
  ngOnInit(): void {
    this.tabIndex = 1;
    if (!this.taskIDChild) {
      this.taskIdAvailable = false;
    }
  }
  ngAfterViewInit(): void {}
  public backToAllTasks(): void {
    this.taskService.ChangeTaskProfileModeBooleanSubjectValue(false);
    this.taskService.ChangeTaskIDSubjectNumberValue(null);
  }

}
