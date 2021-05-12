import {AfterViewInit, Component, OnInit, ViewChild, Input} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';
import {UsersService} from './users.service';

export interface IUser {
  userEmail: string;
  password: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  roleIDs: number[];
}

export interface ITabUsers {
  roleID: number;
  roleName: string;
  dataSource?: MatTableDataSource<IUser>;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['userEmail', 'password', 'firstName', 'lastName', 'contactNumber', 'details', 'update', 'delete'];

  dataSource: MatTableDataSource<IUser>;

  USERS_DATA: IUser[];

  usersTabs: ITabUsers[] = [
    {roleID: 6, roleName: 'All'},
    {roleID: 0, roleName: 'Customers'},
    {roleID: 1, roleName: 'Account Coordinators'},
    {roleID: 2, roleName: 'Developers'},
    {roleID: 3, roleName: 'Project Managers'},
    {roleID: 4, roleName: 'CEO'},
    {roleID: 5, roleName: 'Admins'}];

  createUserMode = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private http1: HttpClient,
              public dialog: MatDialog,
              public usersService: UsersService) {
    this.usersService.createUserModeBooleanSubject.subscribe(value => this.getData());
  }

  ngOnInit(): void {
    this.usersService.ChangeCreateUserModeBooleanSubjectValue(false);
  }

  getData(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-all-users-details`, {}).subscribe(
      response => {
        this.USERS_DATA = response.data;
        console.log(response.data);
        this.usersTabs.forEach(tab => {
          tab.dataSource = new MatTableDataSource<IUser>(this.USERS_DATA.filter(
            user => tab.roleID === 6 ? true : user.roleIDs.indexOf(tab.roleID) !== -1));
          tab.dataSource.sort = this.sort;
          tab.dataSource.paginator = this.paginator;
        });
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
              this.getData();
            },
            error => {
              console.log(error);
              console.log('error! delete not success! ' + id);
              this.getData();
            });
      } else {
        console.log(`Dialog result: ${result}`);
      }
    });
  }

  changeMode(value: boolean): void {
    this.usersService.ChangeCreateUserModeBooleanSubjectValue(!value);
    this.createUserMode = value;
    this.getData();
  }
}
