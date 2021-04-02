import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Chart} from 'node_modules/chart.js';

export interface IComplaint{
  complainID: string;
  productID: string;
  description: string;
  submittedDate: any;
  lastDateOfPending: any;
  accountCoordinatorName: string;

}

@Component({
  selector: 'app-cdashboard',
  templateUrl: './cdashboard.component.html',
  styleUrls: ['./cdashboard.component.css']
})
export class CdashboardComponent implements OnInit, AfterViewInit {


  constructor(private router: Router,
              private http1: HttpClient) { }
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

  data4: string[] = ['count'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // ............................................................Chart eka
  // tslint:disable-next-line:typedef
  datawo: any;
  datfi: any;
  datpe: any;

  ngOnInit(): void {

    this.getfullcount();
    this.getpendingcount();
    this.getfinishcount();
    this.getworkingcount();
    this.getlatecount();
  }

  ngAfterViewInit(): void {
    this.http1.get<any>(`http://localhost:3000/ceo/get-notaction-details`, {}).subscribe(
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
    this.http1.get<any>(`http://localhost:3000/ceo/get-full-count`, {}).subscribe(
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
    this.http1.get<any>(`http://localhost:3000/ceo/get-finish-count`, {}).subscribe(
      response => {
        this.dataSourcefinish = response.data;
        console.log(this.dataSourcefinish);
        this.datfi = this.dataSourcefinish[0].count;
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getworkingcount() {
    this.http1.get<any>(`http://localhost:3000/ceo/get-working-count`, {}).subscribe(
      response => {
        this.dataSourceworking = response.data;
        console.log(this.dataSourceworking[0].count);
        this.datawo = this.dataSourceworking[0].count;
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getpendingcount() {
    this.http1.get<any>(`http://localhost:3000/ceo/get-pending-count`, {}).subscribe(
      response => {
        this.dataSourcepending = response.data;
        console.log(this.dataSourcepending);
        this.datpe = this.dataSourcepending[0].count;
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getlatecount() {
    this.http1.get<any>(`http://localhost:3000/ceo/get-late-count`, {}).subscribe(
      response => {
        this.dataSourcelate = response.data;
        const tet1 = this.dataSourcelate[0].count;
        console.log(tet1);
        console.log(this.datawo);
    // ..........................chart eka
        // tslint:disable-next-line:prefer-const
        var myChart = new Chart('myChart1', {
          type: 'bar',
          data: {
            labels: ['Finish', 'Working-Progress', 'Pending'],
            datasets: [{
              label: ' ',
              data: [this.datfi , this.datawo, this.datpe],
              backgroundColor: [
                'rgba(128, 255, 0, 1)',
                'rgba(255, 128, 0, 1)',
                'rgba(102, 0, 102, 0.8)'
              ],
              borderColor: [
                'rgba(128, 255, 0, 1)',
                'rgba(255, 128, 0, 1)',
                'rgba(102, 0, 102, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });


// .................. chart 1 eka iwary
// 2weni chart eka
        var myChart = new Chart('myChart2', {
          type: 'pie',
          data: {
            labels: ['late', 'not late '],
            datasets: [{
              label: 'Complaints',
              data: [tet1 , this.datawo + this.datpe - tet1],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
          }
        });
// ................ 2 weni chart ekt iwaryi....
      }, error => {
        console.log(error);
      }
    );
  }


}
