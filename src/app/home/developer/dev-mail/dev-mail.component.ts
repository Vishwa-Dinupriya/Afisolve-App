import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccoorcomplaintsService} from '../../accountCoordinator/accoorcomplaints/accoorcomplaints.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-dev-mail',
  templateUrl: './dev-mail.component.html',
  styleUrls: ['./dev-mail.component.css']
})
export class DevMailComponent implements OnInit {
  @ViewChild('myForm') myForm;
  DevCreateMailForm: FormGroup;
  userEmailList;
  userNameList;

  constructor(
    private fb1: FormBuilder,
    private accoorcomplaintsService: AccoorcomplaintsService,
    private http1: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.DevCreateMailForm = this.fb1.group({
      subject: ['', [Validators.minLength(10), Validators.required]],
      userEmail: ['', [Validators.email, Validators.required]],
      message: ['', [Validators.minLength(10), Validators.required]],
    });
    this.http1.post<any>(environment.developerApiUrl + '/get-UserList', {}).subscribe(
      response => {
        this.userEmailList = response.data.map(value => value.userEmail);
        this.userNameList = response.data.map(value => value.userName);
      }, error => {
        console.log(error);
      }
    );
  }
  onSubmit(): void {
    const dialogRef1 = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Are you sure you want to send this mail ?',
        message: 'Please Confirm!',
        name: ' ',
        button1: 'No',
        button2: 'Yes'
      }
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(this.DevCreateMailForm.value);
        this.accoorcomplaintsService.sendMail(this.DevCreateMailForm.value)
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

