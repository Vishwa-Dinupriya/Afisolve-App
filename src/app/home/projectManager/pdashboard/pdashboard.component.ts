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
  selector: 'app-pdashboard',
  templateUrl: './pdashboard.component.html',
  styleUrls: ['./pdashboard.component.css']
})
export class PdashboardComponent implements OnInit, AfterViewInit {

  cl: any;
  pe: any;
  fn: any;
  wr: any;
  constructor(private router: Router,
              private http1: HttpClient) { }
  private dataSourceUsersmonth: any;
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

  // tslint:disable-next-line:typedef
  b: string;


  // tslint:disable-next-line:typedef
  firstm: string;
  secondm: string;
  thirdm: string;
  fourthm: string;
  fifthm: string;
// tslint:disable-next-line:typedef
  wc: string;
  allll: any;
  penn: any;
  wor: any;
  closs: any;
  finn: any;

  // tslint:disable-next-line:typedef
// tslint:disable-next-line:typedef
  dataSourceClosed: any;

  ngOnInit(): void {
    this.getmonthCount();
    this.getfullcount();
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


  // ....................................................................
  getmonthCount(){
    this.http1.get<any>(`http://localhost:3000/projectManager/get-month-count`, {}).subscribe(
      response => {
        this.dataSourceUsersmonth = response.data;
        console.log(this.dataSourceUsersmonth);

        // ..........................chart eka
        // tslint:disable-next-line:prefer-const
        var myChart = new Chart('myChart3', {
          type: 'line',
          data: {
            // tslint:disable-next-line:max-line-length
            labels: [this.dataSourceUsersmonth.fifthm, this.dataSourceUsersmonth.fourthm, this.dataSourceUsersmonth.thirdm, this.dataSourceUsersmonth.secondm, this.dataSourceUsersmonth.firstm],
            datasets: [{
              label: ' Complaints received per month',
              // tslint:disable-next-line:max-line-length
              data: [this.dataSourceUsersmonth.fifth, this.dataSourceUsersmonth.fourth, this.dataSourceUsersmonth.third, this.dataSourceUsersmonth.second, this.dataSourceUsersmonth.first ],
              backgroundColor: [
                'rgba(255, 255, 255, 1)',
              ],
              fill: false,
              borderColor: [
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            legend: {
              labels: {
                // This more specific font property overrides the global property
                fontColor: '#ffffff'
              }
            },
            scales: {
              xAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'month',
                  fontColor: '#ffffff',
                  fontSize: 6
                },
                ticks: {
                  fontColor: '#ffffff',
                  fontSize: 6
                }
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Tasks',
                  fontColor: '#ffffff',
                  fontSize: 8
                },
                ticks: {
                  fontColor: '#ffffff',
                  fontSize: 8
                }
              }]
            }
          }
        });


      }, error => {
        console.log(error);
      }
    );
  }

  // ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

  // tslint:disable-next-line:typedef
  getfullcount() {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-full-count`, {}).subscribe(
      response => {
        this.dataSourceUsers1 = response.data;
        // ..........................chart eka
        // tslint:disable-next-line:prefer-const
        var myChart = new Chart('myChart1', {
          type: 'doughnut',
          data: {
            labels: ['Pending', 'Working-Progress', 'Completed', 'Closed'],
            datasets: [{
              label: ' ',
              data: [this.dataSourceUsers1.pen, this.dataSourceUsers1.work, this.dataSourceUsers1.fin, this.dataSourceUsers1.clos],
              backgroundColor: [
                '#9DC2FF',
                '#4F91FF',
                '#2264D1',
                '#133774',
              ],
              borderColor: [
                '#9DC2FF',
                '#4F91FF',
                '#2264D1',
                '#133774',

              ],
              borderWidth: 1
            }]
          },
          options: {

          }
        });
      }, error => {
        console.log(error);
      }
    );
  }

  getlatecount() {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-late-count`, {}).subscribe(
      response => {
        this.dataSourcelate = response.data;
        const tet1 = this.dataSourcelate[0].count;
        console.log(tet1);
        console.log(this.datawo);
      }, error => {
        console.log(error);
      }
    );
  }
}
