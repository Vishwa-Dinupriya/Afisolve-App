import {HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {MatTabGroup} from '@angular/material/tabs';


export interface IComplaint {
  complaintID: string;
  subComplaintID: string;
  productID: string;
  description: string;
  statusName: string;
  submittedDate: string;
  firstName: string;
}

@Component({
  selector: 'app-cviewreports',
  templateUrl: './cviewreports.component.html',
  styleUrls: ['./cviewreports.component.css']
})
export class CviewreportsComponent implements OnInit, AfterViewInit {
  scid: any;
  pid: any;
  did: any;
  ssid: any;
  ststid: any;
  acid: any;
  selectData: any;
  cid: string;
  hid2: boolean;
  pm: string;
  pendate: any;
  findate: any;
  work: any;

  constructor(private router: Router,
              private http1: HttpClient) { }

  displayedColumns: string[] = ['productID', 'complaintID', 'subComplaintID', 'description', 'statusName', 'submittedDate', 'print'];

  dataSource: MatTableDataSource<IComplaint>;
  COMPLAINS_DATA: IComplaint[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTabGroup) mattabgroup: MatTabGroup;

  title = 'angular-checkbox-list-demo';
  selectedItemsList = [];
  checkedIDs = [];

  checkboxesDataList = [
    {
      id: 'C001',
      label: 'Completed',
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

  // tslint:disable-next-line:typedef
  selectedAll: any;

  ngOnInit(): void {
    this.hid2 = true;
    this.fetchSelectedItems();
  }


  ngAfterViewInit(): void {
    this.http1.get<any>(`http://localhost:3000/ceo/get-complaint-details1`, {}).subscribe(
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
    // tslint:disable-next-line:triple-equals max-line-length
    if ((this.selectedItemsList[0].label == 'Completed') && (this.selectedItemsList[1].label == 'Working Progress') && (this.selectedItemsList[2].label == 'Pending')){
      this.selectedAll = true;
      this.giveall();
    } else {
      this.selectedAll = false;
    }
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
    if ( (this.selectedItemsList[0].label == 'Completed') && (this.selectedItemsList[1].label == 'Working Progress')  ){
      this.http1.get<any>(`http://localhost:3000/ceo/get-complaint-fw`, {}).subscribe(
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
  }

  // tslint:disable-next-line:typedef
  getAl2(){
    // tslint:disable-next-line:triple-equals
    if ( (this.selectedItemsList[0].label == 'Completed') && (this.selectedItemsList[1].label == 'Pending')  ){
      this.http1.get<any>(`http://localhost:3000/ceo/get-complaint-pf`, {}).subscribe(
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
  }

  // tslint:disable-next-line:typedef
  getAl3(){
    // tslint:disable-next-line:triple-equals
    if ( (this.selectedItemsList[0].label == 'Working Progress') && (this.selectedItemsList[1].label == 'Pending')  ){
      this.http1.get<any>(`http://localhost:3000/ceo/get-complaint-wp`, {}).subscribe(
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
  }

  // tslint:disable-next-line:typedef
  getAl4(){
    // tslint:disable-next-line:triple-equals
    if ( (this.selectedItemsList[0].label == 'Completed') ){
      this.http1.get<any>(`http://localhost:3000/ceo/get-complaint-de`, {}).subscribe(
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
  }

  // tslint:disable-next-line:typedef
  getAl5(){
    // tslint:disable-next-line:triple-equals
    if ( (this.selectedItemsList[0].label == 'Working Progress') ){
      this.http1.get<any>(`http://localhost:3000/ceo/get-complaint-det`, {}).subscribe(
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
  }

  // tslint:disable-next-line:typedef
  getAl6(){
    // tslint:disable-next-line:triple-equals
    if ( (this.selectedItemsList[0].label == 'Pending') ){
      this.http1.get<any>(`http://localhost:3000/ceo/get-complaint-detai`, {}).subscribe(
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
  }

  // tslint:disable-next-line:typedef
  giveall() {
   this.ngAfterViewInit();
  }

  // tslint:disable-next-line:typedef
  selectAll() {
    // tslint:disable-next-line:prefer-for-of
    for (var i = 0; i < this.checkboxesDataList.length; i++) {
      this.checkboxesDataList[i].isChecked = this.selectedAll;
    }
  }

  // tslint:disable-next-line:typedef
  getID(row) {
    this.mattabgroup.selectedIndex = 1;
    console.log(row);
    this.hid2 = false;
    this.selectData = row; // click krana row eka mokadd kyla thyna eka
    this.cid = this.selectData.complaintID;
    this.pid = this.selectData.productID;
    this.scid = this.selectData.subComplaintID;
    this.did = this.selectData.description;
    this.ssid = this.selectData.statusName;
    this.ststid = this.selectData.submittedDate;
    this.pendate = this.selectData.lastDateOfPending;
    this.work = this.selectData.wipStartDate;
    this.findate = this.selectData.finishedDate;
    this.acid = this.selectData.firstName + ' ' + this.selectData.lastName;
    this.pm = this.selectData.pfirstName + ' ' + this.selectData.plastName;
  }

  // tslint:disable-next-line:typedef
  changetab(selectedTabIndex){
    this.mattabgroup.selectedIndex = selectedTabIndex;
    // tslint:disable-next-line:no-conditional-assignment triple-equals
    if (selectedTabIndex == 0){
      this.hid2 = true;
    }
  }



}
