import { Component, OnInit , ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';



export interface IAllTask {
  taskID: string;
  complaintID: string;
  subComplaintID: string;
  assignDate: string;
  deadline: string;
  DevName: string;
  developerEmail: string;
}

export interface INewTask {
  taskID: string;
  complaintID: string;
  subComplaintID: string;
  assignDate: string;
  deadline: string;
  DevName: string;
  developerEmail: string;
}
export interface IIPTask {
  taskID: string;
  complaintID: string;
  subComplaintID: string;
  assignDate: string;
  deadline: string;
  DevName: string;
  developerEmail: string;
}
export interface ICompletedTask {
  taskID: string;
  complaintID: string;
  subComplaintID: string;
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
export class TasksComponent implements OnInit {
  displayedColumnsAll: string[] = ['taskID', 'complaintID', 'subComplaintID', 'assignDate', 'deadline', 'DevName', 'developerEmail', 'details'];
  dataSourceAll: MatTableDataSource<IAllTask>;
  ALLTASK_DATA: IAllTask[];
  ////////////////////////////////////////////
  displayedColumnsNew: string[] = ['taskID', 'complaintID', 'subComplaintID', 'assignDate', 'deadline', 'DevName', 'developerEmail', 'details'];
  dataSourceNew: MatTableDataSource<INewTask>;
  NEWTASK_DATA: INewTask[];
  /////////////////////////////////////////////////
  addTaskMode = false;
  taskprofileMode = false;
  //////////////////////////////////////////////////
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  taskIDParent: string;
  ////////////////////////////////////////////
  displayedColumnsInProgress: string[] = ['taskID', 'complaintID', 'subComplaintID', 'assignDate', 'deadline', 'DevName', 'developerEmail', 'details'];
  dataSourceInProgress: MatTableDataSource<IIPTask>;
  IPTASK_DATA: IIPTask[];

  displayedColumnsCompleted: string[] = ['taskID', 'complaintID', 'subComplaintID',  'DevName', 'developerEmail', 'details'];
  dataSourceCompleted: MatTableDataSource<ICompletedTask>;
  COMPLETEDTASK_DATA: IAllTask[];

  constructor( private router: Router,
               private http1: HttpClient) { }

  ngOnInit(): void {
    this.http1.post<any>(`http://localhost:3000/accountCoordinator//get-Task-All-details`, {}).subscribe(
      response => {
        this.ALLTASK_DATA = response.data;
        this.dataSourceAll = new MatTableDataSource<IAllTask>(this.ALLTASK_DATA);
        this.dataSourceAll.sort = this.sort;
        this.dataSourceAll.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    ),
    this.http1.post<any>(`http://localhost:3000/accountCoordinator//get-Task-New-details`, {}).subscribe(
      response => {
        this.NEWTASK_DATA = response.data;
        this.dataSourceNew = new MatTableDataSource<INewTask>(this.NEWTASK_DATA);
        this.dataSourceNew.sort = this.sort;
        this.dataSourceNew.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    ),
    this.http1.post<any>(`http://localhost:3000/accountCoordinator//get-Task-IP-details`, {}).subscribe(
      response => {
        this.IPTASK_DATA = response.data;
        this.dataSourceInProgress = new MatTableDataSource<IIPTask>(this.IPTASK_DATA);
        this.dataSourceInProgress.sort = this.sort;
        this.dataSourceInProgress.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    ),
      this.http1.post<any>(`http://localhost:3000/accountCoordinator//get-Task-Comple-details`, {}).subscribe(
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
  public redirectToDetails(id: string): void {
    this.taskIDParent = id;
    console.log(this.taskIDParent);
    this.taskprofileMode = true;
  }
  public redirectToTasks(): void {
    this.taskprofileMode = false;
  }

}
