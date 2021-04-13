import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccoorcomplaintsService} from '../accoorcomplaints/accoorcomplaints.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../shared/dialog-box/dialog-box.component';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})

export class MailComponent implements OnInit {
  @ViewChild('myForm') myForm;
  MailForm: FormGroup;


  constructor(
    private fb1: FormBuilder,
    private accoorcomplaintsService: AccoorcomplaintsService,
    private http1: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.MailForm = this.fb1.group({
      subject: ['', [Validators.required]],
      recMail: ['', [Validators.email, Validators.required]],
      message: ['', [Validators.required]],
    });
  }
  onSubmit(): void {
    const dialogRef1 = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Confirm!',
        message: 'Do you want to send this mail ? ',
        name: ' ',
        button1: 'No',
        button2: 'Yes'
      }
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(this.MailForm.value);
        this.accoorcomplaintsService.sendMail(this.MailForm.value)
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
