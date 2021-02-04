import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  displayedColumns = ['userEmail', 'password', 'firstName', 'details', 'update', 'delete'];
  dataSourceUsers;

  constructor(private router: Router,
              private http1: HttpClient) {
  }

  ngOnInit(): void {
    console.log('from OnInit test');
    this.http1.post<any>(`http://localhost:3000/admin/get-users-details`, {}).subscribe(
      response => {
        this.dataSourceUsers = response.data;
        console.log(this.dataSourceUsers);
      }, error => {
        console.log(error);
      }
    );

  }

  public redirectToDetails(id: string): void {
    console.log(id);
  }

  public redirectToUpdate(id: string): void {
    console.log(id);
  }

  public redirectToDelete(id: string): void {
    console.log(id);
  }
}
