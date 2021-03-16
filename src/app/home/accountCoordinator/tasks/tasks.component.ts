import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  displayedColumnsIP: string[] = ['taskID', 'complaintID', 'subComplaintID', 'assignDate', 'deadline', 'DevName', 'developerEmail'];
  dataSourceIP;

  constructor( private router: Router,
               private http1: HttpClient) { }

  ngOnInit(): void {
    this.http1.post<any>(`http://localhost:3000/accountCoordinator//get-Task-IP-details`, {}).subscribe(
      response => {
        this.dataSourceIP = response.data;
        console.log(this.dataSourceIP);
      }, error => {
        console.log(error);
      }
    );
  }

}
