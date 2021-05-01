import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumnsUsers: string[] = ['fullName', 'email'];
  dataSourceUsers;
  dataSourceComplaints;

  constructor(private router: Router,
              private http1: HttpClient) {
  }

  ngOnInit(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-users-details-brief`, {}).subscribe(
      response => {
        this.dataSourceUsers = response.data;
        // console.log(this.dataSourceUsers);
      }, error => {
        console.log(error);
      }
    );

    this.http1.post<any>(`http://localhost:3000/admin/get-complaints-details-brief`, {}).subscribe(
      response => {
        this.dataSourceComplaints = response.data;
        // console.log(this.dataSourceComplaints);
      }, error => {
        console.log(error);
      }
    );
  }
}
