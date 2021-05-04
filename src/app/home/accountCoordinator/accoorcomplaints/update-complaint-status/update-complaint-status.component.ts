import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccoorcomplaintsService} from '../accoorcomplaints.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../../../shared/dialog-box/dialog-box.component';

@Component({
  selector: 'app-update-complaint-status',
  templateUrl: './update-complaint-status.component.html',
  styleUrls: ['./update-complaint-status.component.css']
})
export class UpdateComplaintStatusComponent implements OnInit {
  @ViewChild('myForm') myForm;
  complaintStatusList = ['InProgress', 'Completed', 'Closed'];
  updateComplaintStatusForm: FormGroup;

  constructor(
    private fb1: FormBuilder,
    private accoorcomplaintsService: AccoorcomplaintsService,
    private http1: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.updateComplaintStatusForm = this.fb1.group({
      complaintID: ['', [Validators.required]],
      subComplaintID: ['', [Validators.required]],
      complaintStatus: ['', [Validators.required]],
    });
  }
  onSubmit(): void {
    const dialogRef1 = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Confirm form submission!',
        message: 'Do you want to update status ? ',
        name: ' ',
        button1: 'No',
        button2: 'Yes'
      }
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(this.updateComplaintStatusForm.value);
        this.accoorcomplaintsService.updatecomplaintstatus(this.updateComplaintStatusForm.value)
          .subscribe(
            response => {
              const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  title: 'Success!',
                  message: 'You have successfully updated a complaint status',
                  name: ' ',
                  button1: 'Back to complaints',
                  button2: 'Ok'
                }
              });

              dialogRef2.afterClosed().subscribe(result2 => {
                console.log(`Dialog result: ${result}`);
                this.myForm.resetForm();
                if (result2 === true) {

                } else {
                  this.accoorcomplaintsService.ChangeAddComplaintModeBooleanSubjectValue(true);
                }
              });
            },
            error => console.error('Error!(frontend)', error)
          );
      } else {
        this.accoorcomplaintsService.ChangeAddComplaintModeBooleanSubjectValue(true);
      }
    });
  }

}
