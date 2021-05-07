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
  firstmmm: string;
  secondm: string;
  secondmmm: string;
  thirdm: string;
  thirdmmm: string;
  fourthm: string;
  fourthmmm: string;
  fifthm: string;
  fifthmmm: string;
  dataSourceUsersmonth: any;
  dataSourceUsersmonthusers: any;
  dataSourceFeed: any;

  constructor(private router: Router,
              private http1: HttpClient) {
  }

  ngOnInit(): void {
    this.getActiveUsers();
    this.getUsersCount();
    this.getComplaintCount();
    this.getClosedCount();
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
      //  console.log(this.dataSourceUsers[0].lastName);
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
      //  console.log(this.dataSourceUsers1);
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
       // console.log(this.dataSourceActive);
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getComplaintCount(){
    this.http1.post<any>(`http://localhost:3000/admin/get-all-complaints-count`, {}).subscribe(
      response => {
        this.dataSourcetot = response.data;
        // console.log(this.dataSourcetot);
      }, error => {
        console.log(error);
      }
    );
  }


  // tslint:disable-next-line:typedef
  getClosedCount(){
    this.http1.post<any>(`http://localhost:3000/admin/get-closed-complaints-count`, {}).subscribe(
      response => {
        this.dataSourceClosed = response.data;
        console.log(this.dataSourceClosed[0].count);
        console.log(this.dataSourcetot[0].count - this.dataSourceClosed[0].count);


        // ..........................chart eka
        // tslint:disable-next-line:prefer-const
        let myChart = new Chart('myChart1', {
          type: 'doughnut',
          data: {
            labels: ['Closed Complaints', 'Non-Closed Complaints'],
            datasets: [{
              label: ' ',
              data: [this.dataSourceClosed[0].count , (this.dataSourcetot[0].count - this.dataSourceClosed[0].count)],
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
       // console.log(this.dataSourceUsersmonth[4].num);
       // console.log(this.dataSourceUsersmonth[3].num);
       // console.log(this.dataSourceUsersmonth[2].num);
        this.firstm = this.dataSourceUsersmonth[0].num;
        this.secondm = this.dataSourceUsersmonth[1].num;
        this.thirdm = this.dataSourceUsersmonth[2].num;



        // ..........................chart eka
        // tslint:disable-next-line:prefer-const
        let myChart = new Chart('myChart3', {
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
       //  console.log(this.dataSourceUsersmonth[4].num);
      //  console.log(this.dataSourceUsersmonth[3].num);
      //  console.log(this.dataSourceUsersmonth[2].num);
      //  console.log(this.dataSourceUsersmonthusers[1].num);
      //  console.log(this.dataSourceUsersmonthusers[0].num);

        const f = this.dataSourceUsers1[0].count;

        console.log(f);




        // ..........................chart eka
        // tslint:disable-next-line:prefer-const
        let myChart = new Chart('myChart4', {
          type: 'line',
          data: {
            // tslint:disable-next-line:max-line-length
            labels: [this.dataSourceUsersmonthusers[4].month, this.dataSourceUsersmonthusers[3].month, this.dataSourceUsersmonthusers[2].month, this.dataSourceUsersmonthusers[1].month, this.dataSourceUsersmonthusers[0].month],
            datasets: [{
              label: '',
              // tslint:disable-next-line:max-line-length
              data: [(f - this.dataSourceUsersmonthusers[4].num - this.dataSourceUsersmonthusers[3].num - this.dataSourceUsersmonthusers[2].num - this.dataSourceUsersmonthusers[1].num), (f - this.dataSourceUsersmonthusers[4].num - this.dataSourceUsersmonthusers[3].num - this.dataSourceUsersmonthusers[2].num), (f - this.dataSourceUsersmonthusers[4].num - this.dataSourceUsersmonthusers[3].num), (f - this.dataSourceUsersmonthusers[4].num), f ],
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
        console.log(this.dataSourceFeed[1].num);


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
              data: [this.dataSourceFeed[0].num , this.dataSourceFeed[1].num, this.dataSourceFeed[2].num, this.dataSourceFeed[3].num, this.dataSourceFeed[4].num],
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
