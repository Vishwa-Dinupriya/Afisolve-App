import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Chart} from 'node_modules/chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumnsUsers;
  dataSourceUsers;
  dataSourceComplaints;
  dataSourceUsers1: any;
  dataSourceActive: any;
  dataSourcetot: any;
  dataSourceClosed: any;


  // tslint:disable-next-line:typedef
  firstm: string;
  secondm: string;
  thirdm: string;
  fifthm: string;
  dataSourceUsersmonth: any;
  dataSourceUsersmonthusers: any;
  dataSourceFeed: any;
  alllll: number;
  close: number;

  constructor(private router: Router,
              private http1: HttpClient) {
  }

  ngOnInit(): void {
    this.getActiveUsers();
    this.getUsersCount();
    this.getComplaintCount();
    this.getActiveUsersCount();
    this.getmonthCount();
    this.getmonthCountUser();
    this.getFeedbackCount();

  }


  // tslint:disable-next-line:typedef
  getActiveUsers(){
    this.http1.post<any>(`http://localhost:3000/admin/get-active-users`, {}).subscribe(
      response => {
        this.dataSourceUsers = response.data;
      }, error => {
        console.log(error);
      }
    );
  }


  // tslint:disable-next-line:typedef
  getUsersCount(){
    this.http1.post<any>(`http://localhost:3000/admin/get-all-user-count`, {}).subscribe(
      response => {
        this.dataSourceUsers1 = response.data;
      }, error => {
        console.log(error);
      }
    );
  }


  // tslint:disable-next-line:typedef
  getActiveUsersCount(){
    this.http1.post<any>(`http://localhost:3000/admin/get-active-user-count`, {}).subscribe(
      response => {
        this.dataSourceActive = response.data;
      }, error => {
        console.log(error);
      }
    );
  }

 getComplaintCount(){
  this.http1.post<any>(`http://localhost:3000/admin/get-all-complaints-count`, {}).subscribe(
    response => {
      this.dataSourcetot = response.data;
      this.alllll = this.dataSourcetot.alll;
      this.close = this.dataSourcetot.clos;

        let myChart = new Chart('myChart1', {
          type: 'doughnut',
          data: {
            labels: ['Closed Complaints', 'Non-Closed Complaints'],
            datasets: [{
              label: ' ',
              data: [this.dataSourcetot.clos , (this.dataSourcetot.alll - this.dataSourcetot.clos)],
              backgroundColor: [
                '#20b5e3',
                '#fc0341'
                // 'rgba(128, 255, 0, 1)',
                // 'rgba(255, 128, 0, 1)',
                // 'rgba(102, 0, 102, 0.8)'
              ],
              borderColor: [
                '#20b5e3',
                '#fc0341'
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


  getmonthCount(){
    this.http1.get<any>(`http://localhost:3000/admin/get-month-count`, {}).subscribe(
      response => {
        this.dataSourceUsersmonth = response.data;
        let myChart = new Chart('myChart3', {
          type: 'line',
          data: {
            // tslint:disable-next-line:max-line-length
            labels: [this.dataSourceUsersmonth.fifthm, this.dataSourceUsersmonth.fourthm, this.dataSourceUsersmonth.thirdm, this.dataSourceUsersmonth.secondm, this.dataSourceUsersmonth.firstm],
            datasets: [{
              label: 'Variation in the total number of complaints',
              // tslint:disable-next-line:max-line-length
              data: [this.dataSourceUsersmonth.fifth, this.dataSourceUsersmonth.fourth, this.dataSourceUsersmonth.third, this.dataSourceUsersmonth.second, this.dataSourceUsersmonth.first],
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


      }, error => {
        console.log(error);
      }
    );
  }




  // tslint:disable-next-line:typedef
  getmonthCountUser(){
    this.http1.get<any>(`http://localhost:3000/admin/get-month-count-users`, {}).subscribe(
      response => {
        this.dataSourceUsersmonthusers = response.data;

        const f = this.dataSourceUsers1[0].count;

        console.log(f);




        // ..........................chart eka
        // tslint:disable-next-line:prefer-const
        let myChart = new Chart('myChart4', {
          type: 'line',
          data: {
            // tslint:disable-next-line:max-line-length
            labels: [this.dataSourceUsersmonthusers.fifthm, this.dataSourceUsersmonthusers.fourthm, this.dataSourceUsersmonthusers.thirdm, this.dataSourceUsersmonthusers.secondm, this.dataSourceUsersmonthusers.firstm],
            datasets: [{
              label: 'Variation in the total number of users',
              // tslint:disable-next-line:max-line-length
              data: [(f - this.dataSourceUsersmonthusers.first - this.dataSourceUsersmonthusers.second - this.dataSourceUsersmonthusers.third - this.dataSourceUsersmonthusers.fourth), ( f - this.dataSourceUsersmonthusers.first - this.dataSourceUsersmonthusers.second - this.dataSourceUsersmonthusers.third), ( f - this.dataSourceUsersmonthusers.first - this.dataSourceUsersmonthusers.second), ( f - this.dataSourceUsersmonthusers.first), f ],
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
                  labelString: 'Users',
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


  // tslint:disable-next-line:typedef
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
