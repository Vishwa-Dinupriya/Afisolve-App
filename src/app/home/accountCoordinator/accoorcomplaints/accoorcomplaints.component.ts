import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

export interface IAllComp {
  complaintID: string;
  subComplaintID: string;
  productID: string;
  description: string;
  status: string;
}



@Component({
  selector: 'app-accoorcomplaints',
  templateUrl: './accoorcomplaints.component.html',
  styleUrls: ['./accoorcomplaints.component.css']
})
export class AccoorcomplaintsComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  displayedColumns1: string[] = ['complaintID', 'subComplaintID', 'productID', 'description', 'status', 'submittedDate' , 'lastDateOfPending', 'wipStartDate', 'finishedDate', 'details'];
  dataSource1: MatTableDataSource<IAllComp>;
  ALLCOMPLAINTS_DATA: IAllComp[];
  //////////////////////////
  addComplaintMode = false;
  complaintprofileMode = false;
  //////////////////////////////////
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  complainIDParent: string;
  //////////////////////////////////
  displayedColumns3: string[] = ['complaintID', 'subComplaintID', 'productID', 'description',  'submittedDate' , 'lastDateOfPending', 'details'];
  dataSource3;

  displayedColumns4: string[] = ['complaintID', 'subComplaintID', 'productID', 'description',  'submittedDate' , 'wipStartDate', 'details'];
  dataSource4;

  displayedColumns5: string[] = ['complaintID', 'subComplaintID', 'productID', 'description',  'submittedDate' , 'finishedDate', 'details'];
  dataSource5;

  displayedColumns6: string[] = ['complaintID', 'subComplaintID', 'productID', 'description', 'submittedDate' , 'finishedDate', 'details'];
  dataSource6;

  constructor(private router: Router,
              private http1: HttpClient) {

  }

  ngOnInit(): void {
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
  applyFilterAll(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
 // applyFilterNew(event): void {
  //  const filterValue = (event.target as HTMLInputElement).value;
   // this.dataSource2.filter = filterValue.trim().toLowerCase();
 // }
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
  public redirectToDetails(id: string): void {
    this.complainIDParent = id;
    console.log(this.complainIDParent);
    this.complaintprofileMode = true;
  }
  public redirectToComplaints(): void {
    this.complaintprofileMode = false;
  }

}
