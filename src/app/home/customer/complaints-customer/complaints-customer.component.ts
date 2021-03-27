import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ComplaintsCustomerService} from './complaints-customer.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {IComplaint} from '../../admin/complaints/complaints.component';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-complaints-customer',
  templateUrl: './complaints-customer.component.html',
  styleUrls: ['./complaints-customer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ComplaintsCustomerComponent implements OnInit, AfterViewInit {
  createComplaintMode: boolean;

  COMPLAINS_DATA: ComplaintWithSubsElement[];
  // COMPLAINS_DATA: IComplaint[];
  dataSource;

  columnsToDisplayOuterTable = ['complaintID', 'description', 'submittedDate', 'productID', 'details'];
  columnsToDisplayInnerTable = ['subComplaintID', 'description', 'submittedDate', 'details'];

  expandedElement: IComplaint | null;

  constructor(
    private http1: HttpClient,
    public complaintsCustomerService: ComplaintsCustomerService) {
  }

  ngOnInit(): void {
    this.createComplaintMode = false;
  }

  ngAfterViewInit(): void {
    this.http1.post<any>(`http://localhost:3000/customer/get-all-complaints`, {}).subscribe(
      response => {
        this.COMPLAINS_DATA = response.data;
        this.dataSource = this.COMPLAINS_DATA;
        // this.dataSource = new MatTableDataSource<IComplaint>(this.COMPLAINS_DATA);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
  }

  redirectToDetails(n: number): void {
    console.log(n);
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

