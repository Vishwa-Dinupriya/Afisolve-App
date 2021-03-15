import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


class Owner {

}

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css']
})

export class ViewReportsComponent implements OnInit {




  constructor( private http1: HttpClient) {}

  displayedColumns: string[] = ['complainID', 'subComplaintID', 'description', 'status', 'submittedDate', 'lastDateOfPending', 'wipStartDate', 'finishedDate' ];
  // @ts-ignore
  dataSourcer = new MatTableDataSource();
  bc;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  checks: boolean;
  ngOnInit(): void {
    this.getData();
    this.ngAfterViewInit();
  }

  // tslint:disable-next-line:typedef
  bulk(e){
    // tslint:disable-next-line:triple-equals
    if (e.target.checked === true){
      this.checks = true;
    }
    else {
      this.checks = false;
    }
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSourcer.paginator = this.paginator;
  }
  // get all data
  // tslint:disable-next-line:typedef
  getData(){
    this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-details1`, {}).subscribe(
      response => {
        this.dataSourcer = response.data;
        this.dataSourcer.data = response as Owner[];
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

  // tslint:disable-next-line:typedef
  year(){
    this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-year`, {}).subscribe(
      response => {
        this.dataSourcer = response.data;
        console.log(this.dataSourcer);
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  month(){
    this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-month`, {}).subscribe(
      response => {
        this.dataSourcer = response.data;
        console.log(this.dataSourcer);
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  today(){
    this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-today`, {}).subscribe(
      response => {
        this.dataSourcer = response.data;
        console.log(this.dataSourcer);
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourcer.filter = filterValue;
  }
}


