import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ComplaintsCustomerService} from './complaints-customer.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {formatNumber} from '@angular/common';

@Component({
  selector: 'app-complaints-customer',
  templateUrl: './complaints-customer.component.html',
  styleUrls: ['./complaints-customer.component.css'],
})
export class ComplaintsCustomerComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}

export interface ComplaintWithSubsElement {
  complaintID: string;
  description: string;
  finishedDate: string;
  lastDateOfPending: string;
  productID: string;
  status: string;
  subComplaintID: string;
  submittedDate: string;
  wipStartDate: string;
  subComplaints: ComplaintWithSubsElement[] | null;
}

