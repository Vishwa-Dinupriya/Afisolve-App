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

  cl: string;
 dataSourceFeed: any;
 closs: any;
allll: any;
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
  firstmmm: string;
   secondm: string;
  secondmmm: string;
   thirdm: string;
  thirdmmm: string;
   fourthm: string;
  fourthmmm: string;
   fifthm: string;
  fifthmmm: string;

  // tslint:disable-next-line:typedef
   wc: string;

  // tslint:disable-next-line:typedef
   pe: string;

  // tslint:disable-next-line:typedef
  dataSourceClosed: any;

  ngOnInit(): void {
    this.getfullcount();
    this.getmonthCount();
    this.getlatecount();
    this.getFeedbackCount();

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
    this.http1.get<any>(`http://localhost:3000/ceo/get-month-count`, {}).subscribe(
      response => {
        this.dataSourceUsersmonth = response.data;
        console.log(this.dataSourceUsersmonth[4].num);
        console.log(this.dataSourceUsersmonth[3].num);
        console.log(this.dataSourceUsersmonth[2].num);
        this.firstm = this.dataSourceUsersmonth[0].num;
        this.secondm = this.dataSourceUsersmonth[1].num;
        this.thirdm = this.dataSourceUsersmonth[2].num;



        // ..........................chart eka
        // tslint:disable-next-line:prefer-const
        var myChart = new Chart('myChart3', {
          type: 'line',
          data: {
            // tslint:disable-next-line:max-line-length
            labels: [this.dataSourceUsersmonth[4].month, this.dataSourceUsersmonth[3].month, this.dataSourceUsersmonth[2].month, this.dataSourceUsersmonth[1].month, this.dataSourceUsersmonth[0].month],
            datasets: [{
              label: ' ',
              // tslint:disable-next-line:max-line-length
              data: [this.dataSourceUsersmonth[4].num, this.dataSourceUsersmonth[3].num, this.dataSourceUsersmonth[2].num, this.dataSourceUsersmonth[1].num, this.dataSourceUsersmonth[0].num ],
              backgroundColor: [
                '',
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
                  labelString: 'Complaints',
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


        var myChart = new Chart('myChart4', {
          type: 'line',
          data: {
            // tslint:disable-next-line:max-line-length
            labels: [this.dataSourceUsersmonth[4].month, this.dataSourceUsersmonth[3].month, this.dataSourceUsersmonth[2].month, this.dataSourceUsersmonth[1].month, this.dataSourceUsersmonth[0].month],
            datasets: [{
              label: ' ',
              // tslint:disable-next-line:max-line-length
              data: [(this.allll - this.dataSourceUsersmonth[4].num - this.dataSourceUsersmonth[3].num - this.dataSourceUsersmonth[2].num - this.dataSourceUsersmonth[1].num), ( this.allll - this.dataSourceUsersmonth[4].num - this.dataSourceUsersmonth[3].num - this.dataSourceUsersmonth[2].num), ( this.allll - this.dataSourceUsersmonth[4].num - this.dataSourceUsersmonth[3].num), ( this.allll - this.dataSourceUsersmonth[4].num ), this.allll],
              backgroundColor: [
                '',
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
                  labelString: 'Total Complaints',
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
    this.http1.get<any>(`http://localhost:3000/ceo/get-full-count`, {}).subscribe(
      response => {
        this.dataSourceUsers1 = response.data;
        console.log(this.dataSourceUsers1);
        this.allll = this.dataSourceUsers1.alll;
        this.datpe = this.dataSourceUsers1.pen;
        this.datawo = this.dataSourceUsers1.work;
        this.datfi = this.dataSourceUsers1.fin;
        this.closs = this.dataSourceUsers1.clos;

        // ..........................chart eka
        var myChart = new Chart('myChart1', {
          type: 'doughnut',
          data: {
            labels: ['Completed', 'Working-Progress', 'Pending', 'Closed'],
            datasets: [{
              label: ' ',
              data: [this.datfi , this.datawo, this.datpe, this.closs],
              backgroundColor: [
                '#358731',
                '#fc0341',
                '#20b5e3',
                '#8f0b9c'

                // 'rgba(255, 128, 0, 1)',
                // 'rgba(102, 0, 102, 0.8)'
              ],
              borderColor: [
                '#358731',
                '#fc0341',
                '#20b5e3',
                '#8f0b9c',

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
    this.http1.get<any>(`http://localhost:3000/ceo/get-late-count`, {}).subscribe(
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
  getFeedbackCount(){
    this.http1.get<any>(`http://localhost:3000/admin/get-feedback-count`, {}).subscribe(
      response => {
        this.dataSourceFeed = response.data;
        // for (let i = 0; i < 5; i++){
        console.log(this.dataSourceFeed.sat1);


        // }


        // ..........................chart eka
        // tslint:disable-next-line:prefer-const
        let myChart = new Chart('myChart5', {
          type: 'pie',
          data: {
            labels: ['Very Good', 'Good' , 'normal', 'not bad', 'bad'],
            datasets: [{
              label: ' ',
              // tslint:disable-next-line:max-line-length
              data: [this.dataSourceFeed.sat5 , this.dataSourceFeed.sat4, this.dataSourceFeed.sat3, this.dataSourceFeed.sat2, this.dataSourceFeed.sat1],
              backgroundColor: [
                '#20b5e3',
                '#fc0341',
                '#358731',
                '#4d523e',
                '#e36120'
              ],
              borderColor: [
                '#20b5e3',
                '#ed3453',
                '#358731',
                '#4d523e',
                '#e36120'
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



}
