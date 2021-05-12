import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../shared/dialog-box/dialog-box.component';
import {TaskService} from './task.service';
import {environment} from '../../../../environments/environment';

export interface IAllTask {
  taskID: number;
  complaintID: number;
  subComplaintID: number;
  assignDate: string;
  deadline: string;
  DevName: string;
  developerEmail: string;
}
export interface IOverdueTask {
  taskID: number;
  complaintID: number;
  subComplaintID: number;
  assignDate: string;
  deadline: string;
  DevName: string;
  developerEmail: string;
}
export interface INewTask {
  taskID: number;
  complaintID: number;
  subComplaintID: number;
  assignDate: string;
  deadline: string;
  DevName: string;
  developerEmail: string;
}
export interface IIPTask {
  taskID: number;
  complaintID: number;
  subComplaintID: number;
  assignDate: string;
  deadline: string;
  DevName: string;
  developerEmail: string;
}
export interface ICompletedTask {
  taskID: number;
  complaintID: number;
  subComplaintID: number;
  assignDate: string;
  deadline: string;
  DevName: string;
  developerEmail: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  displayedColumnsAll: string[] = ['complaintID', 'subComplaintID', 'taskID',  'assignDate', 'deadline', 'task_status', 'DevName', 'developerEmail', 'details'];
  dataSourceAll: MatTableDataSource<IAllTask>;
  ALLTASK_DATA: IAllTask[];
  // --------------------------------------------------------------------- //
  displayedColumnsOverdue: string[] = ['taskID', 'complaintID', 'subComplaintID', 'assignDate', 'deadline', 'DevName', 'developerEmail', 'details'];
  dataSourceOverdue: MatTableDataSource<IOverdueTask>;
  OVERDUETASK_DATA: IOverdueTask[];
  // --------------------------------------------------------------------- //
  // --------------------------------------------------------------------- //
  displayedColumnsNew: string[] = ['taskID', 'complaintID', 'subComplaintID', 'assignDate', 'deadline', 'DevName', 'developerEmail', 'details'];
  dataSourceNew: MatTableDataSource<INewTask>;
  NEWTASK_DATA: INewTask[];
  // --------------------------------------------------------------------- //
  displayedColumnsInProgress: string[] = ['taskID', 'complaintID', 'subComplaintID', 'assignDate', 'deadline', 'DevName', 'developerEmail', 'details'];
  dataSourceInProgress: MatTableDataSource<IIPTask>;
  IPTASK_DATA: IIPTask[];
  // --------------------------------------------------------------------- //
  displayedColumnsCompleted: string[] = ['taskID', 'complaintID', 'subComplaintID',  'DevName', 'developerEmail', 'details'];
  dataSourceCompleted: MatTableDataSource<ICompletedTask>;
  COMPLETEDTASK_DATA: IAllTask[];
  // --------------------------------------------------------------------- //
  createTask = false;
  selectedTaskID;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  taskIDParent: string;
  // --------------------------------------------------------------------- //
  constructor( private router: Router,
               private http1: HttpClient,
               private dialog: MatDialog,
               public taskService: TaskService) {
    this.taskService.createTaskModeBooleanSubject.subscribe(value => this.ngAfterViewInit());
  }

  ngOnInit(): void {
    this.taskService.ChangeCreateTaskModeBooleanSubjectValue(false);
    this.taskService.ChangeTaskProfileModeBooleanSubjectValue(false);
  }
  // tslint:disable-next-line:use-lifecycle-interface
   ngAfterViewInit(): void {
    this.http1.post<any>(environment.accountCoordinatorApiUrl + `//get-Task-All-details`, {}).subscribe(
      response => {
        this.ALLTASK_DATA = response.data;
        this.dataSourceAll = new MatTableDataSource<IAllTask>(this.ALLTASK_DATA);
        this.dataSourceAll.sort = this.sort;
        this.dataSourceAll.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    ),
      this.http1.post<any>(environment.accountCoordinatorApiUrl + `//get-Task-Overdue-details`, {}).subscribe(
        response => {
          this.OVERDUETASK_DATA = response.data;
          this.dataSourceOverdue = new MatTableDataSource<IOverdueTask>(this.OVERDUETASK_DATA);
          this.dataSourceOverdue.sort = this.sort;
          this.dataSourceOverdue.paginator = this.paginator;
        }, error => {
          console.log(error);
        }
      ),
    this.http1.post<any>(environment.accountCoordinatorApiUrl + `//get-Task-New-details`, {}).subscribe(
      response => {
        this.NEWTASK_DATA = response.data;
        this.dataSourceNew = new MatTableDataSource<INewTask>(this.NEWTASK_DATA);
        this.dataSourceNew.sort = this.sort;
        this.dataSourceNew.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    ),
    this.http1.post<any>(environment.accountCoordinatorApiUrl + `//get-Task-IP-details`, {}).subscribe(
      response => {
        this.IPTASK_DATA = response.data;
        this.dataSourceInProgress = new MatTableDataSource<IIPTask>(this.IPTASK_DATA);
        this.dataSourceInProgress.sort = this.sort;
        this.dataSourceInProgress.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    ),
      this.http1.post<any>(environment.accountCoordinatorApiUrl + `//get-Task-Comple-details`, {}).subscribe(
        response => {
          this.COMPLETEDTASK_DATA = response.data;
          this.dataSourceCompleted = new MatTableDataSource<ICompletedTask>(this.COMPLETEDTASK_DATA);
          this.dataSourceCompleted.sort = this.sort;
          this.dataSourceCompleted.paginator = this.paginator;
        }, error => {
          console.log(error);
        }
      );
  }
  applyFilterAll(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAll.filter = filterValue.trim().toLowerCase();
  }
  applyFilterOverdue(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceOverdue.filter = filterValue.trim().toLowerCase();
  }
  applyFilterNew(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceNew.filter = filterValue.trim().toLowerCase();
  }
  applyFilterInProgress(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceInProgress.filter = filterValue.trim().toLowerCase();
  }
  applyFilterCompleted(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCompleted.filter = filterValue.trim().toLowerCase();
  }
  public redirectToDetails(id: number): void {
    console.log(id);
    this.selectedTaskID = id;
    this.taskService.ChangeTaskProfileModeBooleanSubjectValue(true);
  }
  changeMode(value: boolean): void {
    this.taskService.ChangeCreateTaskModeBooleanSubjectValue(!value);
    this.createTask = value;
  }

}
