import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Chart} from 'node_modules/chart.js';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-devdashboard',
  templateUrl: './devdashboard.component.html',
  styleUrls: ['./devdashboard.component.css']
})
export class DevdashboardComponent implements OnInit {
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
              private http1: HttpClient) { }

  ngOnInit(): void {
    this.getmonthCount();
  }

  getmonthCount(): void {
    this.http1.get<any>(environment.developerApiUrl + `/get-dev-task-count`, {}).subscribe(
      response => {
        this.dataSourceUsersmonth = response.data;
        this.allll = this.dataSourceUsersmonth.alll;
        this.datpe = this.dataSourceUsersmonth.pen;
        this.datawo = this.dataSourceUsersmonth.work;
        this.datfi = this.dataSourceUsersmonth.fin;
        this.late = this.dataSourceUsersmonth.latet;
        this.closs = this.dataSourceUsersmonth.clos;
        console.log(this.datawo);
        // ..........................chart eka
        // tslint:disable-next-line:prefer-const
        var myChart = new Chart('myChart3', {
          type: 'line',
          data: {
            // tslint:disable-next-line:max-line-length
            labels: [this.dataSourceUsersmonth.fifthm, this.dataSourceUsersmonth.fourthm, this.dataSourceUsersmonth.thirdm, this.dataSourceUsersmonth.secondm, this.dataSourceUsersmonth.firstm],
            datasets: [{
              label: 'Tasks received per month',
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


        var myChart = new Chart('myChart1', {
          type: 'doughnut',
          data: {
            labels: ['Completed', 'Working-Progress', 'Pending', 'Closed'],
            datasets: [{
              label: ' ',
              data: [this.datfi , this.datawo, this.datpe, this.closs],
              backgroundColor: [
                '#9DC2FF',
                '#4F91FF',
                '#2264D1',
                '#133774',

                // 'rgba(255, 128, 0, 1)',
                // 'rgba(102, 0, 102, 0.8)'
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
}
