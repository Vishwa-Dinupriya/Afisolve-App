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

  constructor(private http1: HttpClient) { }

  ngOnInit(): void {
    this.getFeedbackCount();
    this.getfullcount();
    this.getpencount();
    this.getworkcount();
    this.getfinishcount();
    this.getclosecount();
  }

  // tslint:disable-next-line:typedef
  getFeedbackCount(){
    this.http1.get<any>(`http://localhost:3000/customer/get-feedback-countcus`, {}).subscribe(
      response => {
        this.dataSourceFeed = response.data;
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
      }, error => {
        console.log(error);
      }
    );
  }

  getfinishcount(): void {
    this.http1.get<any>(`http://localhost:3000/customer/get-finish-count`, {}).subscribe(
      response => {
        this.dataSourceUsers4 = response.data;
        console.log(this.dataSourceUsers4);
      }, error => {
        console.log(error);
      }
    );
  }

  getpencount(): void {
    this.http1.get<any>(`http://localhost:3000/customer/get-pending-count`, {}).subscribe(
      response => {
        this.dataSourceUsers2 = response.data;
        console.log(this.dataSourceUsers2);
      }, error => {
        console.log(error);
      }
    );
  }

  getworkcount(): void {
    this.http1.get<any>(`http://localhost:3000/customer/get-working-count`, {}).subscribe(
      response => {
        this.dataSourceUsers3 = response.data;
        console.log(this.dataSourceUsers3);
      }, error => {
        console.log(error);
      }
    );
  }

  getclosecount(): void {
    this.http1.get<any>(`http://localhost:3000/customer/get-closed-count`, {}).subscribe(
      response => {
        this.dataSourceUsers5 = response.data;
        console.log(this.dataSourceUsers5);

        // ..........................chart eka
        // tslint:disable-next-line:prefer-const
        var myChart = new Chart('myChart1', {
          type: 'doughnut',
          data: {
            labels: ['Pending', 'Working-Progress', 'Finish', 'Closed'],
            datasets: [{
              label: ' ',
              // tslint:disable-next-line:max-line-length
              data: [this.dataSourceUsers2[0].count , this.dataSourceUsers3[0].count, this.dataSourceUsers4[0].count, this.dataSourceUsers5[0].count],
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
