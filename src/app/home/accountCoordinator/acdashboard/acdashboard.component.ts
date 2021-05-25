import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Chart} from 'node_modules/chart.js';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-acdashboard',
  templateUrl: './acdashboard.component.html',
  styleUrls: ['./acdashboard.component.css']
})
export class AcdashboardComponent implements OnInit {
  closs: any;
  allll: any;
  datawo: any;
  datfi: any;
  datpe: any;
  late: any;
  dataSourcetask: any;
  altask: any;
  pentask: any;
  wortask: any;
  fintask: any;
  dataSourceUsersmonth: any;

  constructor(private router: Router,
              private http1: HttpClient) {
  }

  ngOnInit(): void {
    this.getmonthCount();
    this.gettaskCount();
  }

  getmonthCount(): void {
    this.http1.get<any>(environment.accountCoordinatorApiUrl + `/get-month-count`, {}).subscribe(
      response => {
        this.dataSourceUsersmonth = response.data;
        this.allll = this.dataSourceUsersmonth.alll;
        this.datpe = this.dataSourceUsersmonth.pen;
        this.datawo = this.dataSourceUsersmonth.work;
        this.datfi = this.dataSourceUsersmonth.fin;
        this.closs = this.dataSourceUsersmonth.clos;
        // ..........................chart eka
        // tslint:disable-next-line:prefer-const
        var myChart = new Chart('myChart3', {
          type: 'line',
          data: {
            // tslint:disable-next-line:max-line-length
            labels: [this.dataSourceUsersmonth.fifthm, this.dataSourceUsersmonth.fourthm, this.dataSourceUsersmonth.thirdm, this.dataSourceUsersmonth.secondm, this.dataSourceUsersmonth.firstm],
            datasets: [{
              label: 'Complaints received per month',
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

  gettaskCount(): void {
    this.http1.get<any>(environment.accountCoordinatorApiUrl + `/get-task-count`, {}).subscribe(
      response => {
        this.dataSourcetask = response.data;
        this.altask = this.dataSourcetask.alll;
        this.pentask = this.dataSourcetask.pen;
        this.wortask = this.dataSourcetask.work;
        this.fintask = this.dataSourcetask.fin;
        this.late = this.dataSourcetask.latet;
      }, error => {
        console.log(error);
      }
    );
  }
}
