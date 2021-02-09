import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';


export interface IUser {
  userEmail: string;
  password: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
}

@Component({
  selector: 'app-test-sorting',
  templateUrl: './test-sorting.component.html',
  styleUrls: ['./test-sorting.component.css']
})
export class TestSortingComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['userEmail', 'password', 'firstName', 'lastName', 'contactNumber', 'details'];

  dataSource: MatTableDataSource<IUser>;
  USERS_DATA: IUser[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private http1: HttpClient) {
    //
    // this.USERS_DATA =
    //   [
    //     {userEmail: '1', password: 'Hydrogen', contactNumber: 1.0079, firstName: 'H', lastName: 'H'},
    //     {userEmail: '2', password: 'Helium', contactNumber: 4.0026, firstName: 'He', lastName: 'H'},
    //     {userEmail: '3', password: 'Lithium', contactNumber: 6.941, firstName: 'Li', lastName: 'H'},
    //     {userEmail: '4', password: 'Beryllium', contactNumber: 9.0122, firstName: 'Be', lastName: 'H'},
    //     {userEmail: '5', password: 'Boron', contactNumber: 10.811, firstName: 'B', lastName: 'H'},
    //     {userEmail: '6', password: 'Carbon', contactNumber: 12.0107, firstName: 'C', lastName: 'H'},
    //     {userEmail: '7', password: 'Nitrogen', contactNumber: 14.0067, firstName: 'N', lastName: 'H'},
    //     {userEmail: '8', password: 'Oxygen', contactNumber: 15.9994, firstName: 'O', lastName: 'H'},
    //     {userEmail: '9', password: 'Fluorine', contactNumber: 18.9984, firstName: 'F', lastName: 'H'},
    //     {userEmail: '10', password: 'Neon', contactNumber: 20.1797, firstName: 'Ne', lastName: 'H'}
    //   ];
    // // this.dataSource = new MatTableDataSource<IUser>(this.USERS_DATA);
  }

  ngOnInit(): void {
    console.log('from OnInit testing-sort');
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


