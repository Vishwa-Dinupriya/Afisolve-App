import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {DevtaskService} from './devtask.service';

export interface IAllTask {
  taskID: number;
  productName: string;
  complaintID: number;
  subComplaintID: number;
  assignDate: string;
  deadline: string;
  status: string;
}

export interface IPendingTask {
  taskID: number;
  productName: string;
  complaintID: number;
  subComplaintID: number;
  assignDate: string;
  deadline: string;
}
export interface IIPTask {
  taskID: number;
  productName: string;
  complaintID: number;
  subComplaintID: number;
  assignDate: string;
  deadline: string;
}
export interface ICompletedTask {
  taskID: number;
  productName: string;
  complaintID: number;
  subComplaintID: number;
  assignDate: string;
  deadline: string;
}
@Component({
  selector: 'app-devtasks',
  templateUrl: './devtasks.component.html',
  styleUrls: ['./devtasks.component.css']
})
export class DevtasksComponent implements OnInit {
  displayedColumnsAll: string[] = ['taskID', 'productName', 'complaintID', 'subComplaintID', 'assignDate', 'deadline', 'task_status', 'details'];
  dataSourceAll: MatTableDataSource<IAllTask>;
  ALLTASK_DATA: IAllTask[];
  // -------------------------------------------- //
  displayedColumnsPending: string[] = ['taskID', 'productName', 'complaintID', 'productName', 'subComplaintID', 'assignDate', 'deadline',  'details'];
  dataSourcePending: MatTableDataSource<IPendingTask>;
  PENDINGTASK_DATA: IPendingTask[];
  // -------------------------------------------- //
  displayedColumnsInProgress: string[] = ['taskID', 'productName', 'complaintID', 'subComplaintID', 'assignDate', 'deadline',  'details'];
  dataSourceInProgress: MatTableDataSource<IIPTask>;
  IPTASK_DATA: IIPTask[];
  // -------------------------------------------- //
  displayedColumnsCompleted: string[] = ['taskID', 'productName', 'complaintID', 'subComplaintID',  'details'];
  dataSourceCompleted: MatTableDataSource<ICompletedTask>;
  COMPLETEDTASK_DATA: IAllTask[];
  // -------------------------------------------- //
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private http1: HttpClient,
              private dialog: MatDialog,
              public devtaskService: DevtaskService) {
  }

  ngOnInit(): void {
    this.devtaskService.ChangeTaskProfileModeBooleanSubjectValue(false);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.http1.post<any>(`http://localhost:3000/developer//get-Task-All-details`, {}).subscribe(
      response => {
        this.ALLTASK_DATA = response.data;
        this.dataSourceAll = new MatTableDataSource<IAllTask>(this.ALLTASK_DATA);
        this.dataSourceAll.sort = this.sort;
        this.dataSourceAll.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    ),
      this.http1.post<any>(`http://localhost:3000/developer//get-Task-Pending-details`, {}).subscribe(
        response => {
          this.PENDINGTASK_DATA = response.data;
          this.dataSourcePending = new MatTableDataSource<IPendingTask>(this.PENDINGTASK_DATA);
          this.dataSourcePending.sort = this.sort;
          this.dataSourcePending.paginator = this.paginator;
        }, error => {
          console.log(error);
        }
      ),
      this.http1.post<any>(`http://localhost:3000/developer//get-Task-InProgress-details`, {}).subscribe(
        response => {
          this.IPTASK_DATA = response.data;
          this.dataSourceInProgress = new MatTableDataSource<IIPTask>(this.IPTASK_DATA);
          this.dataSourceInProgress.sort = this.sort;
          this.dataSourceInProgress.paginator = this.paginator;
        }, error => {
          console.log(error);
        }
      ),
      this.http1.post<any>(`http://localhost:3000/developer//get-Task-Completed-details`, {}).subscribe(
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
  applyFilterPending(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePending.filter = filterValue.trim().toLowerCase();
  }
  applyFilterInProgress(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceInProgress.filter = filterValue.trim().toLowerCase();
  }
  applyFilterCompleted(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCompleted.filter = filterValue.trim().toLowerCase();
  }
  public redirectToDetails(taskID: number): void {
    this.devtaskService.ChangeTaskIDSubjectNumberValue(taskID);
    this.devtaskService.ChangeTaskProfileModeBooleanSubjectValue(true);
  }
}
