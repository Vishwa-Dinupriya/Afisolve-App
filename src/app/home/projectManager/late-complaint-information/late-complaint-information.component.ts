import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-late-complaint-information',
  templateUrl: './late-complaint-information.component.html',
  styleUrls: ['./late-complaint-information.component.css']
})
export class LateComplaintInformationComponent implements OnInit {

  displayedColumns: string[] = ['complainID', 'description', 'submittedDate', 'lastDateOfPending' , 'Action'];
  dataSource1;
  constructor(private router: Router, private route: ActivatedRoute, private http1: HttpClient) { }

  ngOnInit(): void {
    this.getData();
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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Account Coordinator Should be change!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          '<a href="http://localhost:4200/home/project-manager/late-complaint-information/action">links</a> ',
          // @ts-ignore
        'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
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

    })();
  }
}
