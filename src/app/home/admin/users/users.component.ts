import {AfterViewInit, Component, OnInit, ViewChild, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';
import {UsersService} from './users.service';

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
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  constructor() {
   }

   ngOnInit(): void {
   }
}
