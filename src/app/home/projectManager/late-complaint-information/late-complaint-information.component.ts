import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import {PastnameService} from '../pastname.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTabGroup} from '@angular/material/tabs';
import {environment} from '../../../../environments/environment';

export interface IComplaint {
  complainID: string;
  description: string;
  finishedDate: string;
  lastDateOfPending: string;
  productID: string;
  status: string;
  subComplaintID: string;
  submittedDate: string;
  wipStartDate: string;
}

export interface IHistory {
  productID: string;
  submittedTime: any;
  time: any;
  preAcName: string;
  newAcName: string;
  exAcName: string;
  charac: string;
  wAction: string;

}
@Component({
  selector: 'app-late-complaint-information',
  templateUrl: './late-complaint-information.component.html',
  styleUrls: ['./late-complaint-information.component.css']
})
export class LateComplaintInformationComponent implements AfterViewInit, OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private http1: HttpClient, private pastname: PastnameService){ }

  raw: string;
  // late complaint table
  displayedColumns: string[] = ['complainID', 'productID', 'description', 'submittedDate', 'lastDateOfPending', 'accountCoordinatorName' , 'accountCoordinatorEmail', 'Action', 'history'];
  dataSource1: MatTableDataSource<IComplaint>;
  COMPLAINS_DATA: IComplaint[];

  // history table
  displayedColumnshistory: string[] = ['productID', 'submittedTime', 'preAcName', 'newAcName', 'exAcName', 'charac', 'wAction'];
  dataSourcehistory: MatTableDataSource<IHistory>;
  COMPLAINS_DATA1: IHistory[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTabGroup) mattabgroup: MatTabGroup;

  // tslint:disable-next-line:typedef
   raew: string;
  // tslint:disable-next-line:typedef
   m: string;
   bbb: any;
   // apahu gnna data array eka
   test: string[] = ['complainID', 'productID', 'description', 'submittedDate', 'lastDateOfPending', 'accountCoordinatorName' , 'Action'];
  filterValue: any;

  ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression
    this.pastname.refreshNeeded$
      .subscribe(() => {
         this.ngAfterViewInit();
      });
    this.pastname.refreshNeededforacname$
      .subscribe(() => {
        this.ngAfterViewInit();
      });
  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.http1.get<any>( environment.project_manager_api_url + `/get-complaint-details`, {}).subscribe(
      response => {
        this.COMPLAINS_DATA = response.data;
        this.dataSource1 = new MatTableDataSource<IComplaint>(this.COMPLAINS_DATA);
        this.dataSource1.sort = this.sort;
        this.dataSource1.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
    this.http1.get<any>(environment.project_manager_api_url + `/get-full-history`, {}).subscribe(
      response => {
        this.COMPLAINS_DATA1 = response.data;
        this.dataSourcehistory = new MatTableDataSource<IHistory>(this.COMPLAINS_DATA1);
        this.dataSourcehistory.sort = this.sort;
        this.dataSourcehistory.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
  }


  applyFilter(): void {
    // const filterValue = (event.target as HTMLInputElement).value;
    // const filterValue2 = '0002';
   const filterValue2 = this.filterValue;
   this.dataSourcehistory.filter = filterValue2.trim().toLowerCase();
  }

  // history gnna oona row eka
  // tslint:disable-next-line:typedef
  getproductID(history){
    console.log(history);
    this.filterValue = history;
    this.applyFilter();
  }
  // tslint:disable-next-line:typedef
  onRowClicked(row) {
    this.test = row; // click krana row eka mokadd kyla thyna eka
  }

  // -------------------------------Alert tika-------------------------------

  // main eka
  // tslint:disable-next-line:typedef
  getAlert(){
    Swal.fire({
      title: 'Decision..?',
      text: 'What is your decision!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Send a reminder to Account Coordinator!',
      cancelButtonText: 'Want to replace the Account Coordinator'
    }).then((result) => {
      if (result.value) {
        this.reminder();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.newAllert();
      }
    });
  }


  //////////////////////////////////////////////
  // wenas karna seen eka
  // tslint:disable-next-line:typedef
  newAllert(){
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgba(185,179,186,0.52)',
      cancelButtonColor: '#000000',
      confirmButtonText: '<a href = "http://localhost:4200/home/project-manager/late-complaint-information/action">Yes,Change</a>'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Row clicked: ', this.test);
       // old-acc-name send
        this.pastname.passn(this.test)
          .subscribe(
            response => {
              console.log('Success!(frontend)' + this.test , response);
            },
            error => console.error('Error!(frontend)', error)
          );
       // history table eke row ekk hadima....
        this.pastname.newhistory(this.test)
          .subscribe(
            response => {
              console.log('Success!(frontend)' + this.test , response);
            },
            error => console.error('Error!(frontend)', error)
          );
      }
    });
  }

  ///////////////////////////////////////////
  // reminder eka yawana eka
  // tslint:disable-next-line:typedef
 reminder() {
   Swal.fire({
     title: 'Warning..!!',
     text: 'Reminder Email and Notification will send to Account Coordinator..',
     icon: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Yes, Send a reminder..!',
     cancelButtonText: 'No, Cancel....'
   }).then((result) => {
     if (result.value) {
       Swal.fire(
         'Successfully send a Reminder..!',
         'success'
       );
       // send a reminder to database..................
       this.pastname.reminder(this.test)
         .subscribe(
           response => {
             console.log('Success!(frontend)' + this.test , response);
           },
           error => console.error('Error!(frontend)', error)
         );
     } else if (result.dismiss === Swal.DismissReason.cancel) {
     }
   });
        }

        // tab eka vensa krna eka
  // tslint:disable-next-line:typedef
  changetab(selectedTabIndex){
    this.mattabgroup.selectedIndex = selectedTabIndex;
  }
}
