import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {AccoorcomplaintsService} from './accoorcomplaints.service';
import {environment} from '../../../../environments/environment';

export interface IAllComp {
  complaintID: number;
  subComplaintID: number;
  productID: number;
  description: string;
  status: string;
}
export interface IOverdueComp {
  complaintID: number;
  subComplaintID: number;
  productID: number;
  description: string;
}
export interface IPendingComp {
  complaintID: number;
  subComplaintID: number;
  productID: number;
  description: string;
}
export interface IIPComp {
  complaintID: number;
  subComplaintID: number;
  productID: number;
  description: string;
}
export interface ICompletedComp {
  complaintID: number;
  subComplaintID: number;
  productID: number;
  description: string;
}
export interface IClosedComp {
  complaintID: number;
  subComplaintID: number;
  productID: number;
  description: string;
}
@Component({
  selector: 'app-accoorcomplaints',
  templateUrl: './accoorcomplaints.component.html',
  styleUrls: ['./accoorcomplaints.component.css']
})
export class AccoorcomplaintsComponent implements OnInit {

  // Displaying All Complaints
  // tslint:disable-next-line:max-line-length
  displayedColumns1: string[] = ['complaintID', 'subComplaintID', 'productID', 'productName', 'statusName', 'submittedDate' , 'details'];
  dataSource1: MatTableDataSource<IAllComp>;
  ALLCOMPLAINTS_DATA: IAllComp[];
  // Displaying Overdue Complaints
  displayedColumnsOverdue: string[] = ['complaintID', 'subComplaintID', 'productID', 'productName', 'submittedDate' , 'lastDateOfPending', 'Comment', 'details'];
  dataSourceOverdue: MatTableDataSource<IOverdueComp>;
  OVERDUECOMPLAINTS_DATA: IOverdueComp[];
  // Displaying Pending Complaints
  displayedColumns3: string[] = ['complaintID', 'subComplaintID', 'productID', 'productName', 'submittedDate' , 'lastDateOfPending', 'Comment', 'details'];
  dataSource3: MatTableDataSource<IPendingComp>;
  PENDINGCOMPLAINTS_DATA: IPendingComp[];
  // Displaying InProgress Complaints
  displayedColumns4: string[] = ['complaintID', 'subComplaintID', 'productID', 'productName', 'submittedDate' , 'wipStartDate', 'Comment', 'details'];
  dataSource4: MatTableDataSource<IIPComp>;
  IPCOMPLAINTS_DATA: IIPComp[];
  // Displaying Completed Complaints
  displayedColumns5: string[] = ['complaintID', 'subComplaintID', 'productID', 'productName', 'submittedDate' , 'finishedDate', 'details'];
  dataSource5: MatTableDataSource<ICompletedComp>;
  COMPLETEDCOMPLAINTS_DATA: ICompletedComp[];
  // Displaying Closed Complaints
  displayedColumns6: string[] = ['complaintID', 'subComplaintID', 'productID', 'productName',  'submittedDate' , 'finishedDate', 'details'];
  dataSource6: MatTableDataSource<IClosedComp>;
  CLOSEDCOMPLAINTS_DATA: IClosedComp[];

  addComplaint = false;
  selectedComplaintID;
  selectedsubComplaintID;
  requestedComplaintID;
  requestedSubComplaintID;
  complainIDParent: string;
  complaintIdToCommentSection;
  // subComplaintIdToCommentSection;
  //
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  //
  constructor(private router: Router,
              private http1: HttpClient,
              private dialog: MatDialog,
              public accoorcomplaintService: AccoorcomplaintsService) {
    this.accoorcomplaintService.addComplaintModeBooleanSubject.subscribe(value => this.ngAfterViewInit());
  }
 // Set the add complaint and complaint profile mode boolean value to false initially
  ngOnInit(): void {
    this.accoorcomplaintService.ChangeAddComplaintModeBooleanSubjectValue(false);
    this.accoorcomplaintService.ChangeComplaintProfileModeBooleanSubjectValue(false);
    this.accoorcomplaintService.ChangeComplaintStatusModeBooleanSubjectValue(false);
    this.accoorcomplaintService.changeIsCommentSectionModeSubjectBooleanValue(false);
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.http1.post<any>(environment.accountCoordinatorApiUrl + `/get-accoorcomplaints-details`, {}).subscribe(
      response => {
        this.ALLCOMPLAINTS_DATA = response.data;
        this.dataSource1 = new MatTableDataSource<IAllComp>(this.ALLCOMPLAINTS_DATA);
        this.dataSource1.sort = this.sort;
        this.dataSource1.paginator = this.paginator;
        }, error => {
        console.log(error);
      }
    ),
      this.http1.post<any>(environment.accountCoordinatorApiUrl + `/get-overdue-accoorcomplaints-details`, {}).subscribe(
        response => {
          this.OVERDUECOMPLAINTS_DATA = response.data;
          this.dataSourceOverdue = new MatTableDataSource<IOverdueComp>(this.OVERDUECOMPLAINTS_DATA);
          this.dataSourceOverdue.sort = this.sort;
          this.dataSourceOverdue.paginator = this.paginator;
        }, error => {
          console.log(error);
        }
      ),
      this.http1.post<any>(environment.accountCoordinatorApiUrl + `/get-pending-accoorcomplaints-details`, {}).subscribe(
        response => {
          this.PENDINGCOMPLAINTS_DATA = response.data;
          this.dataSource3 = new MatTableDataSource<IPendingComp>(this.PENDINGCOMPLAINTS_DATA);
          this.dataSource3.sort = this.sort;
          this.dataSource3.paginator = this.paginator;
        }, error => {
          console.log(error);
        }
      ),
      this.http1.post<any>(environment.accountCoordinatorApiUrl + `/get-InProgress-accoorcomplaints-details`, {}).subscribe(
        response => {
          this.IPCOMPLAINTS_DATA = response.data;
          this.dataSource4 = new MatTableDataSource<IIPComp>(this.IPCOMPLAINTS_DATA);
          this.dataSource4.sort = this.sort;
          this.dataSource4.paginator = this.paginator;
        }, error => {
          console.log(error);
        }
      ),
      this.http1.post<any>(environment.accountCoordinatorApiUrl + `/get-Solved-accoorcomplaints-details`, {}).subscribe(
        response => {
          this.COMPLETEDCOMPLAINTS_DATA = response.data;
          this.dataSource5 = new MatTableDataSource<ICompletedComp>(this.COMPLETEDCOMPLAINTS_DATA);
          this.dataSource5.sort = this.sort;
          this.dataSource5.paginator = this.paginator;
        }, error => {
          console.log(error);
        }
      ),
      this.http1.post<any>(environment.accountCoordinatorApiUrl + `/get-Closed-accoorcomplaints-details`, {}).subscribe(
        response => {
          this.CLOSEDCOMPLAINTS_DATA = response.data;
          this.dataSource6 = new MatTableDataSource<IClosedComp>(this.CLOSEDCOMPLAINTS_DATA);
          this.dataSource6.sort = this.sort;
          this.dataSource6.paginator = this.paginator;
        }, error => {
          console.log(error);
        }
      );
  }
  // For filtering complaints
  applyFilterAll(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  applyFilterOverdue(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceOverdue.filter = filterValue.trim().toLowerCase();
  }
  applyFilterPending(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  applyFilterInProgress(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource4.filter = filterValue.trim().toLowerCase();
  }
  applyFilterSolved(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource5.filter = filterValue.trim().toLowerCase();
  }
  applyFilterClosed(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource6.filter = filterValue.trim().toLowerCase();
  }
  // Take back to all complaints after finish view details
  public redirectToDetails(id: number, subid: number): void {
    console.log(id, subid);
    this.selectedComplaintID = id;
    this.selectedsubComplaintID = subid;
    this.accoorcomplaintService.ChangeComplaintProfileModeBooleanSubjectValue(true);
  }
  public redirectToStatus(id: number, subid: number): void {
    console.log(id, subid);
    this.requestedComplaintID = id;
    this.requestedSubComplaintID = subid;
    this.accoorcomplaintService.ChangeComplaintStatusModeBooleanSubjectValue(true);
  }
  public redirectToCommentSection(complaintID: number): void {
    this.complaintIdToCommentSection = complaintID;
   // this.subComplaintIdToCommentSection = subComplaintID;
    this.accoorcomplaintService.changeIsCommentSectionModeSubjectBooleanValue(true);
  }
  changeMode(value: boolean): void {
    this.accoorcomplaintService.ChangeAddComplaintModeBooleanSubjectValue(!value);
    this.addComplaint = value;
  }

}
