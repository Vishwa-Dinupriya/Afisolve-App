import {AfterViewInit, Component, OnInit, ViewChild, Input} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../shared/dialog-box/dialog-box.component';
import {UsersService} from './users.service';

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

  createUserMode = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private http1: HttpClient,
              public dialog: MatDialog,
              public usersService: UsersService) {
    this.usersService.createUserModeBooleanSubject.subscribe(value => this.ngAfterViewInit());
  }

  ngOnInit(): void {
    this.usersService.ChangeCreateUserModeBooleanSubjectValue(false);
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

  applyFilter(event): void {
    // console.log('event: ' + event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public redirectToDetails(id: string): void {
    this.usersService.changeUserEmailParentSubjectStringValue(id);
    console.log(this.usersService.userEmailParent);
    this.usersService.changeIsProfileModeSubjectBooleanValue(true);
  }

  public redirectToUpdate(id: string): void {
    console.log(id);
  }

  public redirectToDelete(id: string): void {
    console.log(id);
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Are you sure?',
        message: 'Are you want to delete ',
        name: id,
        button1: 'Cancel',
        button2: 'delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(`Dialog result: ${result}`);
        this.http1.post<any>(`http://localhost:3000/admin/delete-selected-user`, {selectedUserEmail: id})
          .subscribe(
            response => {
              console.log(response);
              console.log('delete successfully!' + id);
              this.ngAfterViewInit();
            },
            error => {
              console.log(error);
              console.log('error! delete not success! ' + id);
              this.ngAfterViewInit();
            });
      } else {
        console.log(`Dialog result: ${result}`);
      }
    });
  }

  changeMode(value: boolean): void {
    this.usersService.ChangeCreateUserModeBooleanSubjectValue(!value);
    this.createUserMode = value;
    this.ngAfterViewInit();
  }
}
