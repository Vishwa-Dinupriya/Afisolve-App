import {AfterViewInit, Component, Input, OnChanges, OnInit, } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DevtaskService} from '../devtask.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

export interface ITaskDetailsDev {
  taskID: number;
  contactNumber: number;
  task_description: string;
  accountCoordinatorEmail: string;
  accoorName: string;
}

@Component({
  selector: 'app-devtasks-profile',
  templateUrl: './devtasks-profile.component.html',
  styleUrls: ['./devtasks-profile.component.css']
})
export class DevtasksProfileComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() devtaskIDChild: number;
  TASK_DETAILS_DATA: ITaskDetailsDev;
  taskIdAvailable;
  tabIndex;

  constructor(private http1: HttpClient,
              public devtaskService: DevtaskService, public dialog: MatDialog, private router: Router) { }

  ngOnChanges(): void {
    this.tabIndex = 0;
    if (this.devtaskIDChild) {
      this. taskIdAvailable = true;
      this.http1.post<any>(`http://localhost:3000/developer/get-selected-task-details`, {
        taskID: this.devtaskIDChild,
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
    if (!this.devtaskIDChild) {
      this.taskIdAvailable = false;
  }
  }
  ngAfterViewInit(): void {

  }
  public backToAllTasks(): void {
    this.devtaskService.ChangeTaskProfileModeBooleanSubjectValue(false);
    this.devtaskService.ChangeTaskIDSubjectNumberValue(null);
  }
}
