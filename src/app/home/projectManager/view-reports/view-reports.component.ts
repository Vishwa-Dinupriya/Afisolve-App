import {HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';


export interface IComplaint {
  complainID: string;
  subComplaintID: string;
  productID: string;
  description: string;
  status: string;
  submittedDate: string;
  accountCoordinatorName: string;
}

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css']
})

export class ViewReportsComponent implements OnInit , AfterViewInit {
  selectedAll: any;



  constructor(private router: Router,
              private http1: HttpClient) { }

  displayedColumns: string[] = ['complainID', 'subComplaintID', 'productID', 'description', 'status', 'submittedDate', 'accountCoordinatorName', 'print'];

  dataSource: MatTableDataSource<IComplaint>;
  COMPLAINS_DATA: IComplaint[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  title = 'angular-checkbox-list-demo';
  selectedItemsList = [];
  checkedIDs = [];

  checkboxesDataList = [
    {
      id: 'C001',
      label: 'Finish',
      isChecked: false
    },
    {
      id: 'C002',
      label: 'Working Progress',
      isChecked: false
    },
    {
      id: 'C003',
      label: 'Pending',
      isChecked: false
    }
  ]

  ngOnInit(): void {
    this.fetchSelectedItems();
  }


  ngAfterViewInit(): void {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-details1`, {}).subscribe(
      response => {
        this.COMPLAINS_DATA = response.data;
        this.dataSource = new MatTableDataSource<IComplaint>(this.COMPLAINS_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
  }

  applyFilter(event): void {
    console.log('event: ' + event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // const filterValue2 = 'finish' ;
    // this.dataSource.filter = filterValue2.trim().toLowerCase();
  }

  public redirectToDetails(id: string): void {
    console.log(id);
  }
  // ...............................................

  // tslint:disable-next-line:typedef
  getAl(){
    this.getAl4();
    this.getAl5();
    this.getAl6();
    this.getAl1();
    this.getAl2();
    this.getAl3();

  }
  // tslint:disable-next-line:typedef
  changeSelection() {
    this.fetchSelectedItems();
  }

  // tslint:disable-next-line:typedef
  fetchSelectedItems(){
    this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked;
    });
  }


  // tslint:disable-next-line:typedef
  getAl1(){
    // tslint:disable-next-line:triple-equals
    if ( (this.selectedItemsList[0].label == 'Finish') && (this.selectedItemsList[1].label == 'Working Progress')  ){
      this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-fw`, {}).subscribe(
        response => {
          this.dataSource = response.data;
          console.log(this.dataSource);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  // tslint:disable-next-line:typedef
  getAl2(){
    // tslint:disable-next-line:triple-equals
    if ( (this.selectedItemsList[0].label == 'Finish') && (this.selectedItemsList[1].label == 'Pending')  ){
      this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-pf`, {}).subscribe(
        response => {
          this.dataSource = response.data;
          console.log(this.dataSource);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  // tslint:disable-next-line:typedef
  getAl3(){
    // tslint:disable-next-line:triple-equals
    if ( (this.selectedItemsList[0].label == 'Working Progress') && (this.selectedItemsList[1].label == 'Pending')  ){
      this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-wp`, {}).subscribe(
        response => {
          this.dataSource = response.data;
          console.log(this.dataSource);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  // tslint:disable-next-line:typedef
  getAl4(){
    // tslint:disable-next-line:triple-equals
    if ( (this.selectedItemsList[0].label == 'Finish') ){
      this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-de`, {}).subscribe(
        response => {
          this.dataSource = response.data;
          console.log(this.dataSource);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  // tslint:disable-next-line:typedef
  getAl5(){
    // tslint:disable-next-line:triple-equals
    if ( (this.selectedItemsList[0].label == 'Working Progress') ){
      this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-det`, {}).subscribe(
        response => {
          this.dataSource = response.data;
          console.log(this.dataSource);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  // tslint:disable-next-line:typedef
  getAl6(){
    // tslint:disable-next-line:triple-equals
    if ( (this.selectedItemsList[0].label == 'Pending') ){
      this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-detai`, {}).subscribe(
        response => {
          this.dataSource = response.data;
          console.log(this.dataSource);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  // tslint:disable-next-line:typedef
  giveall() {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-details1`, {}).subscribe(
      response => {
        this.COMPLAINS_DATA = response.data;
        this.dataSource = new MatTableDataSource<IComplaint>(this.COMPLAINS_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  selectAll() {
    // tslint:disable-next-line:prefer-for-of
    for (var i = 0; i < this.checkboxesDataList.length; i++) {
      this.checkboxesDataList[i].isChecked = this.selectedAll;
    }
  }




}
