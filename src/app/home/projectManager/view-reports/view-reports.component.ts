import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ThemePalette} from '@angular/material/core';
import {valueReferenceToExpression} from '@angular/compiler-cli/src/ngtsc/annotations/src/util';



@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css']
})

export class ViewReportsComponent implements OnInit {

  displayedColumns: string[] = ['complainID', 'description', 'submittedDate', 'lastDateOfPending' ];
  dataSourcer;
  bc;





  constructor( private http1: HttpClient) {}
  ngOnInit(): void {
    this.getData();
  }

  // get all data
  // tslint:disable-next-line:typedef
  getData(){
    this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-details`, {}).subscribe(
      response => {
        this.dataSourcer = response.data;
        console.log(this.dataSourcer);
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  workingP(){
    this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-det`, {}).subscribe(
      response => {
        this.dataSourcer = response.data;
        console.log(this.dataSourcer);
      }, error => {
        console.log(error);
      }
    );
  }
  // tslint:disable-next-line:typedef
  finish(){
    this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-de`, {}).subscribe(
      response => {
        this.dataSourcer = response.data;
        this.bc = 1;
        console.log(this.dataSourcer);
      }, error => {
        console.log(error);
      }
    );
  }
  // tslint:disable-next-line:typedef
  pending(){
    this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-detai`, {}).subscribe(
      response => {
        this.dataSourcer = response.data;
        console.log(this.dataSourcer);
      }, error => {
        console.log(error);
      }
    );
  }
}


