import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccoorcomplaintsService} from '../../accoorcomplaints/accoorcomplaints.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../../../environments/environment';
import {DialogBoxComponent} from '../../../../shared/dialog-box/dialog-box.component';

@Component({
  selector: 'app-mail-to-developer',
  templateUrl: './mail-to-developer.component.html',
  styleUrls: ['./mail-to-developer.component.css']
})
export class MailToDeveloperComponent implements OnInit {
  @ViewChild('myForm') myForm;
  sendMailToDeveloperForm: FormGroup;
  developerEmailList;
  developerNameList;
  taskIDList;
  devSubjectList = ['Overdue Task', 'New Task', 'Urgent Task' , 'Issue related to Task'];
  constructor(
    private fb1: FormBuilder,
    private accoorcomplaintsService: AccoorcomplaintsService,
    private http1: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sendMailToDeveloperForm = this.fb1.group({
      devSubject: ['', [Validators.required]],
      developerEmail: ['', [Validators.required]],
      taskID: ['', [Validators.required]]
    });
    this.http1.post<any>(environment.accountCoordinatorApiUrl + '/get-Task-All-details', {}).subscribe(
      response => {
        this.taskIDList = response.data.map(value => value.taskID);
      }, error => {
        console.log(error);
      }
    );
    this.http1.post<any>(environment.accountCoordinatorApiUrl + '/get-DeveloperList', {}).subscribe(
      response => {
        this.developerEmailList = response.data.map(value => value.developerEmail);
        this.developerNameList = response.data.map(value => value.developerName);
      }, error => {
        console.log(error);
      }
    );
  }
  onSubmit(): void {
    const dialogRef1 = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Confirm!',
        message: 'Do you want to send this mail to developer ? ',
        name: ' ',
        button1: 'No',
        button2: 'Yes'
      }
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(this.sendMailToDeveloperForm.value);
        this.accoorcomplaintsService.sendMailtoDeveloper(this.sendMailToDeveloperForm.value)
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
