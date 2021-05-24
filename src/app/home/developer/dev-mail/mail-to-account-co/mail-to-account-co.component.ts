import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccoorcomplaintsService} from '../../../accountCoordinator/accoorcomplaints/accoorcomplaints.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../../../environments/environment';
import {DialogBoxComponent} from '../../../../shared/dialog-box/dialog-box.component';

@Component({
  selector: 'app-mail-to-account-co',
  templateUrl: './mail-to-account-co.component.html',
  styleUrls: ['./mail-to-account-co.component.css']
})
export class MailToAccountCoComponent implements OnInit {
  @ViewChild('myForm') myForm;
  sendMailToAcccoorForm: FormGroup;
  accoorEmailList;
  accoorNameList;
  taskIDList;
  SubjectList = ['Task Completed', 'Unable to do the Task', 'Please Extend the deadline'];
  constructor(
    private fb1: FormBuilder,
    private accoorcomplaintsService: AccoorcomplaintsService,
    private http1: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sendMailToAcccoorForm = this.fb1.group({
      Subject: ['', [Validators.required]],
      accoorEmail: ['', [Validators.required]],
      taskID: ['', [Validators.required]]
    });
    this.http1.post<any>(environment.accountCoordinatorApiUrl + '/get-Task-All-details', {}).subscribe(
      response => {
        this.taskIDList = response.data.map(value => value.taskID);
      }, error => {
        console.log(error);
      }
    );
    this.http1.post<any>(environment.developerApiUrl + '/get-AccoorList', {}).subscribe(
      response => {
        this.accoorEmailList = response.data.map(value => value.userEmail);
        this.accoorNameList = response.data.map(value => value.userName);
      }, error => {
        console.log(error);
      }
    );
  }
  onSubmit(): void {
    const dialogRef1 = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Are you sure you want to send this mail to Account Coordinator ?',
        message: 'Please Confirm! ',
        name: ' ',
        button1: 'No',
        button2: 'Yes'
      }
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(this.sendMailToAcccoorForm.value);
        this.accoorcomplaintsService.sendMailtoAccountCo(this.sendMailToAcccoorForm.value)
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

