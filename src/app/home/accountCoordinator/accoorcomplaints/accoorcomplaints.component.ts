import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {AccoorcomplaintsService} from './accoorcomplaints.service';

export interface IAllComp {
  complaintID: number;
  subComplaintID: number;
  productID: number;
  description: string;
  status: string;
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
  // Displaying Pending Complaints
  displayedColumns3: string[] = ['complaintID', 'subComplaintID', 'productID', 'productName', 'submittedDate' , 'lastDateOfPending', 'details'];
  dataSource3;
  // Displaying InProgress Complaints
  displayedColumns4: string[] = ['complaintID', 'subComplaintID', 'productID', 'productName', 'submittedDate' , 'wipStartDate', 'details'];
  dataSource4;
  // Displaying Completed Complaints
  displayedColumns5: string[] = ['complaintID', 'subComplaintID', 'productID', 'productName', 'submittedDate' , 'finishedDate', 'details'];
  dataSource5;
  // Displaying Closed Complaints
  displayedColumns6: string[] = ['complaintID', 'subComplaintID', 'productID', 'productName',  'submittedDate' , 'finishedDate', 'details'];
  dataSource6;

  addComplaint = false;
  selectedComplaintID;
  selectedsubComplaintID;
  complainIDParent: string;

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
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.http1.post<any>(`http://localhost:3000/accountCoordinator/get-accoorcomplaints-details`, {}).subscribe(
      response => {
        this.ALLCOMPLAINTS_DATA = response.data;
        this.dataSource1 = new MatTableDataSource<IAllComp>(this.ALLCOMPLAINTS_DATA);
        this.dataSource1.sort = this.sort;
        this.dataSource1.paginator = this.paginator;
        }, error => {
        console.log(error);
      }
    ),
      this.http1.post<any>(`http://localhost:3000/accountCoordinator/get-pending-accoorcomplaints-details`, {}).subscribe(
        response => {
          this.dataSource3 = response.data;
          console.log(this.dataSource3);
        }, error => {
          console.log(error);
        }
      ),
      this.http1.post<any>(`http://localhost:3000/accountCoordinator/get-InProgress-accoorcomplaints-details`, {}).subscribe(
        response => {
          this.dataSource4 = response.data;
          console.log(this.dataSource4);
        }, error => {
          console.log(error);
        }
      ),
      this.http1.post<any>(`http://localhost:3000/accountCoordinator/get-Solved-accoorcomplaints-details`, {}).subscribe(
        response => {
          this.dataSource5 = response.data;
          console.log(this.dataSource5);
        }, error => {
          console.log(error);
        }
      ),
      this.http1.post<any>(`http://localhost:3000/accountCoordinator/get-Closed-accoorcomplaints-details`, {}).subscribe(
        response => {
          this.dataSource6 = response.data;
          console.log(this.dataSource6);
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
  changeMode(value: boolean): void {
    this.accoorcomplaintService.ChangeAddComplaintModeBooleanSubjectValue(!value);
    this.addComplaint = value;
  }

}
