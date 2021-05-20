import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccoorcomplaintsService} from '../../accoorcomplaints/accoorcomplaints.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../../../shared/dialog-box/dialog-box.component';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-mail-to-customer',
  templateUrl: './mail-to-customer.component.html',
  styleUrls: ['./mail-to-customer.component.css']
})
export class MailToCustomerComponent implements OnInit {
  @ViewChild('myForm') myForm;
  sendMailToCustomerForm: FormGroup;
  customerEmailList;
  customerNameList;
  compIDList;
  cusSubjectList = ['Complaint is in progress', 'Need Some Clarification', 'Complaint Resolved', 'Complaint Closed'];
  constructor(
    private fb1: FormBuilder,
    private accoorcomplaintsService: AccoorcomplaintsService,
    private http1: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sendMailToCustomerForm = this.fb1.group({
      cusSubject: ['', [Validators.required]],
      customerEmail: ['', [Validators.required]],
      complaintID: ['', [Validators.required]]
    });
    this.http1.post<any>(environment.accountCoordinatorApiUrl + '/get-complaintIDlist', {}).subscribe(
      response => {
        this.compIDList = response.data.map(value => value.complaintID);
        }, error => {
        console.log(error);
      }
    );
    this.http1.post<any>(environment.accountCoordinatorApiUrl + '/get-CustomerList', {}).subscribe(
      response => {
        this.customerEmailList = response.data.map(value => value.customerEmail);
        this.customerNameList = response.data.map(value => value.customerName);
      }, error => {
        console.log(error);
      }
    );
  }
  onSubmit(): void {
    const dialogRef1 = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Confirm!',
        message: 'Do you want to send this mail to customer ? ',
        name: ' ',
        button1: 'No',
        button2: 'Yes'
      }
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(this.sendMailToCustomerForm.value);
        this.accoorcomplaintsService.sendMailtoCustomer(this.sendMailToCustomerForm.value)
          .subscribe(
            response => {
              const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  title: 'Success!',
                  message: 'You have successfully sent the mail',
                  name: ' ',
                  button2: 'Ok'
                }
              });

              dialogRef2.afterClosed().subscribe(result2 => {
                console.log(`Dialog result: ${result}`);
                this.myForm.resetForm();
              });
            },
            error => console.error('Error!(frontend)', error)
          );
      }});
  }}
