import { Component, OnInit } from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard-customer',
  templateUrl: './dashboard-customer.component.html',
  styleUrls: ['./dashboard-customer.component.css']
})
export class DashboardCustomerComponent implements OnInit {
dataSourceFeed: any;
dataSourceUsers1: any;
dataSourceUsers2: any;
dataSourceUsers3: any;
dataSourceUsers4: any;
dataSourceUsers5: any;
 allll: any;
 datpe: any;
 datawo: any;
 datfi: any;
 closs: any;

  constructor(private http1: HttpClient) { }

  ngOnInit(): void {
    this.getFeedbackCount();
    this.getfullcount();
  }

  // tslint:disable-next-line:typedef
  getFeedbackCount(){
    this.http1.get<any>(`http://localhost:3000/customer/get-feedback-countcus`, {}).subscribe(
      response => {
        this.dataSourceFeed = response.data;
        console.log(this.dataSourceFeed);


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
                '#133774',
                '#2264D1',
                '#4F91FF',
                '#9DC2FF',
                '#D8E6FF'
              ],
              borderColor: [
                '#133774',
                '#2264D1',
                '#4F91FF',
                '#9DC2FF',
                '#D8E6FF'
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

  getfullcount(): void {
    this.http1.get<any>(`http://localhost:3000/customer/get-full-count`, {}).subscribe(
      response => {
        this.dataSourceUsers1 = response.data;
        console.log(this.dataSourceUsers1);

        this.allll = this.dataSourceUsers1.alll;
        this.datpe = this.dataSourceUsers1.pen;
        this.datawo = this.dataSourceUsers1.work;
        this.datfi = this.dataSourceUsers1.fin;
        this.closs = this.dataSourceUsers1.clos;

        var myChart = new Chart('myChart1', {
          type: 'doughnut',
          data: {
            labels: ['Pending', 'Working-Progress', 'Finish', 'Closed'],
            datasets: [{
              label: ' ',
              // tslint:disable-next-line:max-line-length
              data: [this.datpe , this.datawo, this.datfi, this.closs],
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
}
