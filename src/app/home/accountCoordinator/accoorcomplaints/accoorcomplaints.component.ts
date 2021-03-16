import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-accoorcomplaints',
  templateUrl: './accoorcomplaints.component.html',
  styleUrls: ['./accoorcomplaints.component.css']
})
export class AccoorcomplaintsComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  displayedColumns1: string[] = ['complainID', 'subComplaintID', 'productID', 'complaint_description', 'complaint_status', 'submittedDate' , 'lastDateOfPending', 'wipStartDate', 'finishedDate'];
  dataSource1;

  displayedColumns2: string[] = ['complainID', 'subComplaintID', 'productID', 'complaint_description',  'submittedDate' , 'lastDateOfPending'];
  dataSource2;

  constructor(private router: Router,
              private http1: HttpClient) {

  }

  ngOnInit(): void {
    this.http1.post<any>(`http://localhost:3000/accountCoordinator/get-accoorcomplaints-details`, {}).subscribe(
      response => {
        this.dataSource1 = response.data;
        console.log(this.dataSource1);
      }, error => {
        console.log(error);
      }
    ),
      this.http1.post<any>(`http://localhost:3000/accountCoordinator/get-new-accoorcomplaints-details`, {}).subscribe(
        response => {
          this.dataSource2 = response.data;
          console.log(this.dataSource2);
        }, error => {
          console.log(error);
        }
      );
  }

}
