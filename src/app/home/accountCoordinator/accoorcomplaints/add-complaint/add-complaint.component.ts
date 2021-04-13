import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccoorcomplaintsService} from '../accoorcomplaints.service';
import {HttpClient} from '@angular/common/http';
import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {
  @ViewChild('myForm') myForm;
  addComplaintForm: FormGroup;
  constructor(private fb1: FormBuilder,
              private accoorcomplaintsService: AccoorcomplaintsService,
              private http1: HttpClient,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.addComplaintForm = this.fb1.group({
        productID: ['', [Validators.required]],
        description: ['', [Validators.required]],
  });
  }
  onSubmit(): void {
    const dialogRef1 = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Confirm form submission!',
        message: 'Do you want to add this complaint ? ',
        name: ' ',
        button1: 'No',
        button2: 'Yes'
      }
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(this.addComplaintForm.value);
        this.accoorcomplaintsService.addcomplaint(this.addComplaintForm.value)
          .subscribe(
            response => {
              const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  title: 'Success!',
                  message: 'You have successfully added a complaint',
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
                  this.accoorcomplaintsService.ChangeAddComplaintModeBooleanSubjectValue(false);
                }
              });
            },
            error => console.error('Error!(frontend)', error)
          );
      } else {
        this.accoorcomplaintsService.ChangeAddComplaintModeBooleanSubjectValue(false);
      }
    });
  }

}
