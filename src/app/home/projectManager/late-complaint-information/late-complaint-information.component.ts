import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import {PastnameService} from '../../services/pastname.service';


@Component({
  selector: 'app-late-complaint-information',
  templateUrl: './late-complaint-information.component.html',
  styleUrls: ['./late-complaint-information.component.css']
})
export class LateComplaintInformationComponent implements AfterViewInit, OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http1: HttpClient, private pastname: PastnameService){ }
   selectedRow;
   raw: string;
  displayedColumns: string[] = ['complainID', 'description', 'submittedDate', 'lastDateOfPending', 'accountCoordinatorName' , 'Action'];
  dataSource1;
  // @ts-ignore


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // tslint:disable-next-line:typedef
   raew: string;
  // tslint:disable-next-line:typedef
   m: string;


  ngOnInit(): void {
    this.getData();
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
  }

   getData(): void {
     this.http1.get<any>(`http://localhost:3000/projectManager/get-complaint-details`, {}).subscribe(
       response => {
         this.dataSource1 = response.data;
         console.log(this.dataSource1);
       }, error => {
         console.log(error);
       }
     );
   }
  // tslint:disable-next-line:typedef
  onRowClicked(row) {
    console.log('Row clicked: ', row);
    this.pastname.passn(row)
      .subscribe(
        response => {
          console.log('Success!(frontend)' + row , response);
        },
        error => console.error('Error!(frontend)', error)
      );
  }

  // tslint:disable-next-line:typedef
  getName(raw){
    console.log(raw);
  }
   // getAction(): void {
   // this.router.navigate(['/home/project-manager/late-complaint-information/action']);
  // }

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
      const { value: ipAddress } = await Swal.fire({
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

      if (ipAddress) {
        Swal.fire('Succesfully send a reminder to Account Coordinator',
          `Account coordinator get another ${ipAddress} hours to finished.`,
          'success');
      }
      return ipAddress;

    })();
  }
}
