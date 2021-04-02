import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import {PastnameService} from '../../services/pastname.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTabGroup} from '@angular/material/tabs';

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
   selectedRow;
   raw: string;
  displayedColumns: string[] = ['complainID', 'productID', 'description', 'submittedDate', 'lastDateOfPending', 'accountCoordinatorName' , 'Action', 'history'];
  displayedColumnshistory: string[] = ['productID', 'submittedTime', 'preAcName', 'newAcName', 'exAcName', 'charac', 'wAction'];

  dataSource1: MatTableDataSource<IComplaint>;
  COMPLAINS_DATA: IComplaint[];

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
   test: string[] = ['complainID', 'productID', 'description', 'submittedDate', 'lastDateOfPending', 'accountCoordinatorName' , 'Action'];
  filterValue: any;

  ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression
    this.pastname.refreshNeeded$
      .subscribe(() => {
         this.ngAfterViewInit();
      });


  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-details`, {}).subscribe(
      response => {
        this.COMPLAINS_DATA = response.data;
        this.dataSource1 = new MatTableDataSource<IComplaint>(this.COMPLAINS_DATA);
        this.dataSource1.sort = this.sort;
        this.dataSource1.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
    this.http1.get<any>(`http://localhost:3000/projectManager/get-full-history`, {}).subscribe(
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


  applyFilter(event): void {
    // const filterValue = (event.target as HTMLInputElement).value;
  // const filterValue2 = '0002';
   const filterValue2 = this.filterValue;
   this.dataSourcehistory.filter = filterValue2.trim().toLowerCase();
  }

  public redirectToDetails(id: string): void {
    console.log(id);
  }

  // tslint:disable-next-line:typedef
  getproductID(history){
    console.log(history);
    this.filterValue = history;
    this.applyFilter(event);
  }

  // ..............................................
  // tslint:disable-next-line:typedef
  onRowClicked(row) {
    this.test = row; // click krana row eka mokadd kyla thyna eka
  }
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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Chnge!'
    }).then((result) => {
      if (result.isConfirmed) {
       Swal.fire(
          '\'<a href="http://localhost:4200/home/project-manager/late-complaint-information/action"><button>Go to change</button></a> \''
        );
        // this.router.navigateByUrl('http://localhost:4200/home/project-manager/late-complaint-information/action');
        // this.router.navigate(['action'], {relativeTo: this._activatedRoute});
        // console.log(this.test);
       console.log('Row clicked: ', this.test);
       this.pastname.passn(this.test)
          .subscribe(
            response => {
              console.log('Success!(frontend)' + this.test , response);
            },
            error => console.error('Error!(frontend)', error)
          );
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
    (async () => {

      const ipAPI = '//api.ipify.org?format=json';

      const inputValue = fetch(ipAPI)
        .then(response => response.json())
        .then(data => data.ip);

      // @ts-ignore
      // tslint:disable-next-line:prefer-const
      const { value: time } = await Swal.fire({
        title: 'How long will you give?',
        icon: 'question',
        input: 'range',
        inputLabel: 'minimum hours',
        inputAttributes: {
          min: 1,
          max: 48,
          step: 1
        },


      });

      // tslint:disable-next-line:no-shadowed-variable typedef


      if (time) {
        Swal.fire('Succesfully send a reminder to Account Coordinator',
          `Account coordinator get another ${time} hours to finished.`,
          'success');
        console.log(time);
        this.pastname.reminder(this.test)
          .subscribe(
            response => {
              console.log('Success!(frontend)' + this.test , response);
            },
            error => console.error('Error!(frontend)', error)
          );
        this.pastname.time(time)
          .subscribe(
           response => {
             console.log('Success!(frontend)' + time, response);
          },
          error => console.error('Error!(frontend)', error)
          );
      }
      return time;

    })();
  }

  // tslint:disable-next-line:typedef
  changetab(selectedTabIndex){
    this.mattabgroup.selectedIndex = selectedTabIndex;
  }
}
