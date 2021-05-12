import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {UsersService} from '../users.service';
import {DialogBoxComponent} from '../../../../shared/dialog-box/dialog-box.component';

export interface IUser {
  userEmail: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  roleIDs: number[];
  activeStatus: boolean;
  createdAt: string;
}

export interface ITabUsers {
  roleID: number;
  roleName: string;
  dataSource?: MatTableDataSource<IUser>;
}

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  displayedColumns: string[] = ['userEmail', 'firstName', 'lastName', 'contactNumber', 'createdAt', 'activeStatus', 'details', 'delete'];

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

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private http1: HttpClient,
              public dialog: MatDialog,
              public usersService: UsersService) {
  }

  ngOnInit(): void {
    this.getData();
  }


  getData(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-all-users-details`, {}).subscribe(
      response => {
        console.log(response.data);
        this.USERS_DATA = response.data;
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
    // this.router.navigate(['../user-profile', {username: id}], {relativeTo: this.route});
    this.usersService.changeUserEmailParentSubjectStringValue(id);
    this.usersService.changeIsProfileModeSubjectBooleanValue(true);
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

}

