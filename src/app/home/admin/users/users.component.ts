import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

export interface IUser {
  userEmail: string;
  password: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['userEmail', 'password', 'firstName', 'lastName', 'contactNumber', 'details', 'update', 'delete'];

  dataSource: MatTableDataSource<IUser>;
  USERS_DATA: IUser[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private router: Router,
              private http1: HttpClient) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-users-details`, {}).subscribe(
      response => {
        this.USERS_DATA = response.data;
        this.dataSource = new MatTableDataSource<IUser>(this.USERS_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  applyFilter(event): void {
    // console.log('event: ' + event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
