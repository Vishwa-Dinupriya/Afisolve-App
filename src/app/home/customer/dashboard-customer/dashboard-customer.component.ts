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

  constructor(private http1: HttpClient) { }

  ngOnInit(): void {
    this.getFeedbackCount();
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
