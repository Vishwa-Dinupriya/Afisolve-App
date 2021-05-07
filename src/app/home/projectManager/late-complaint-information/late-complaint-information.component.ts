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
  complaintID: string;
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
  submittedtime: any;
  preAcName: string;
  newAcName: string;
  exAcName: string;
  doneBy: string;
  action: string;

}
@Component({
  selector: 'app-late-complaint-information',
  templateUrl: './late-complaint-information.component.html',
  styleUrls: ['./late-complaint-information.component.css']
})
export class LateComplaintInformationComponent implements AfterViewInit, OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private http1: HttpClient, private pastname: PastnameService){ }
  selectedValue: string;
  accdata;

  raw: string;
  // late complaint table
  displayedColumns: string[] = ['productID', 'complaintID', 'description', 'submittedDate', 'lastDateOfPending', 'firstName' , 'userEmail', 'accountCoordinatorID', 'Action', 'history'];
  dataSource1: MatTableDataSource<IComplaint>;
  COMPLAINS_DATA: IComplaint[];

  // history table
  displayedColumnshistory: string[] = ['submittedtime', 'preAcName', 'newAcName', 'exAcName', 'doneBy', 'action'];
  dataSourcehistory: MatTableDataSource<IHistory>;
  COMPLAINS_DATA1: IHistory[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTabGroup) mattabgroup: MatTabGroup;

  hidd;
  // tslint:disable-next-line:typedef
   raew: string;
  // tslint:disable-next-line:typedef
   m: string;
   bbb: any;
   // apahu gnna data array eka
   test: string[] = ['productID', 'complaintID', 'description', 'submittedDate', 'lastDateOfPending', 'accountCoordinatorName' , 'Action'];
  filterValue: any;


  //////////////////////////////////////////////
  // wenas karna seen eka
  // tslint:disable-next-line:typedef
  ngOnInit(): void {
    this.hidd = true;
    // tslint:disable-next-line:no-unused-expression
    this.pastname.refreshNeeded$
      .subscribe(() => {
         this.ngAfterViewInit();
      });
    this.pastname.refreshNeededforacname$
      .subscribe(() => {
        this.ngAfterViewInit();
      });
    this.getData1();
  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.http1.get<any>( environment.project_manager_api_url + `/get-complaint-details`, {}).subscribe(
      response => {
        this.COMPLAINS_DATA = response.data;
        this.dataSource1 = new MatTableDataSource<IComplaint>(this.COMPLAINS_DATA);
        this.dataSource1.sort = this.sort;
        this.dataSource1.paginator = this.paginator;
        console.log(this.COMPLAINS_DATA);
      }, error => {
        console.log(error);
      }
    );
    this.http1.get<any>(environment.project_manager_api_url + `/get-full-history`, {}).subscribe(
      response => {
        this.COMPLAINS_DATA1 = response.data;
        this.dataSourcehistory = new MatTableDataSource<IHistory>(this.COMPLAINS_DATA1);
        this.dataSourcehistory.sort = this.sort;
      }, error => {
        console.log(error);
      }
    );
  }


  applyFilter(): void {
    // const filterValue = (event.target as HTMLInputElement).value;
    // const filterValue2 = '0002';
    const filterValue2 = '000' + this.filterValue;
    console.log(filterValue2);
  // const filterValue2 = this.filterValue;
    this.dataSourcehistory.filter = filterValue2.trim().toLowerCase();

  }

  // history gnna oona row eka
  // tslint:disable-next-line:typedef
  getproductID(history){
    console.log(history);
    this.filterValue = history;
    this.applyFilter();
    this.changetab(1);
  }
  // tslint:disable-next-line:typedef
  // onRowClicked(row) {
    // this.test = row; // click krana row eka mokadd kyla thyna eka
  // }

  // -------------------------------Alert tika-------------------------------

  // main eka
  // tslint:disable-next-line:typedef
  getAlert(row){
    this.test = row;
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
  newAllert(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'When you change the account Coordinator of the selected product ID, All responsibilities are transfer to the New account coordinator',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgba(255,0,0,0.83)',
      cancelButtonColor: '#000000',
      confirmButtonText: 'Yes,Change'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hidd = false;
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

  // account coordinatorlage names
  getData1(): void {
    this.http1.get<any>(`http://localhost:3000/ceo/get-account-coordinaters-details`, {}).subscribe(
      response => {
        this.accdata = response.data;
        console.log(this.accdata);
      }, error => {
        console.log(error);
      }
    );
  }


  giveAlertnew() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change the Account Coordinator!..'
    }).then((result) => {
      if (result.isConfirmed) {
        this.givenewName();
        this.hidd = true;
        Swal.fire(
          'change saved!',
          '',
          'success'
        );
      }
    });
  }


  // tslint:disable-next-line:typedef
  givenewName() {
    console.log('Row clicked: ', this.test);
    console.log(this.selectedValue);

    this.pastname.newacname(this.test, this.selectedValue)
      .subscribe(
        response => {
          console.log('Success!(frontend)', response);
        },
        error => console.error('Error!(frontend)', error)
      );
    this.pastname.newhistoryAc(this.test, this.selectedValue)
      .subscribe(
        response => {
          console.log('Success!(frontend)', response);
        },
        error => console.error('Error!(frontend)', error)
      );
  }
}
// <ng-container matColumnDef="productID">
//           <th mat-header-cell *matHeaderCellDef mat-sort-header> Product ID</th>
//           <td mat-cell *matCellDef="let element"> {{element.productID}} </td>
//         </ng-container>
