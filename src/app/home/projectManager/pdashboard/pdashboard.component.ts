import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

export interface IComplaint{
  complainID: string;
  productID: string;
  description: string;
  submittedDate: any;
  lastDateOfPending: any;
  accountCoordinatorName: string;

}

@Component({
  selector: 'app-pdashboard',
  templateUrl: './pdashboard.component.html',
  styleUrls: ['./pdashboard.component.css']
})
export class PdashboardComponent implements OnInit, AfterViewInit  {

  displayedColumnsUsers1: string[] = ['productID', 'submittedTime', 'exAcName', 'charac'];
  displayedColumnsComplaints: string[] = ['complainID', 'productID', 'lastDateOfPending'];

  // dataSourceUsers1;

  dataSourceUsers1;
  dataSourcelate: any;
  dataSourcepending: any;
  dataSourceworking: any;
  dataSourcefinish: any;

  dataSourceComplaints: MatTableDataSource<IComplaint>;
  COMPLAINS_DATA: IComplaint[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private http1: HttpClient) { }

  ngOnInit(): void {
    this.getfullcount();
    this.getpendingcount();
    this.getfinishcount();
    this.getworkingcount();
    this.getlatecount();
  }

  ngAfterViewInit(): void {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-notaction-details`, {}).subscribe(
      response => {
        this.COMPLAINS_DATA = response.data;
        console.log(this.COMPLAINS_DATA);
        this.dataSourceComplaints = new MatTableDataSource<IComplaint>(this.COMPLAINS_DATA);
        this.dataSourceComplaints.sort = this.sort;
        this.dataSourceComplaints.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
  }

  applyFilter(event): void {
    console.log('event: ' + event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceComplaints.filter = filterValue.trim().toLowerCase();
  }

  public redirectToDetails(id: string): void {
    console.log(id);
  }

  // ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

  // tslint:disable-next-line:typedef
  getfullcount() {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-full-count`, {}).subscribe(
      response => {
        this.dataSourceUsers1 = response.data;
        console.log(this.dataSourceUsers1);
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getfinishcount() {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-finish-count`, {}).subscribe(
      response => {
        this.dataSourcefinish = response.data;
        console.log(this.dataSourcefinish);
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getworkingcount() {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-working-count`, {}).subscribe(
      response => {
        this.dataSourceworking = response.data;
        console.log(this.dataSourceworking);
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getpendingcount() {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-pending-count`, {}).subscribe(
      response => {
        this.dataSourcepending = response.data;
        console.log(this.dataSourcepending);
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getlatecount() {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-late-count`, {}).subscribe(
      response => {
        this.dataSourcelate = response.data;
        console.log(this.dataSourcelate);
      }, error => {
        console.log(error);
      }
    );
  }

}
