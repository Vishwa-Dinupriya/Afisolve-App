///// This component is for testing purposes- Currently not Related to the the system //////

import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {AccoorcomplaintsService} from '../accoorcomplaints.service';
import {HttpClient} from '@angular/common/http';
import {ErrorStateMatcher} from '@angular/material/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-accoorcomplaint-profile',
  templateUrl: './accoorcomplaint-profile.component.html',
  styleUrls: ['./accoorcomplaint-profile.component.css']
})
export class AccoorcomplaintProfileComponent implements OnInit, OnChanges {

  @Input() complaintIDChild: number;
  @Input() subComplaintIDChild: number;

  // COMPLAINT_GENERAL_DATA: IComplaintGeneral;
  complaintIdAvailable;
  edit = false;
  haveChanges = false;
  updateStatusForm: FormGroup;
  tabIndex;
  updateStatusFormCopy;

 // statusList: string[] = ['Pending', 'InProgress', 'Completed', 'Closed'];
//  selectedStatus: number [] = [];
  statusList = ['Pending', 'InProgress', 'Completed', 'Closed'];

  matcher = new MyErrorStateMatcher();

  constructor(private http1: HttpClient,
              private fb1: FormBuilder,
              private router: Router,
              public dialog: MatDialog,
              public accoorcomplaintService: AccoorcomplaintsService) { }

  ngOnInit(): void {
    if (!(this.complaintIDChild && this.subComplaintIDChild)) {
      this.complaintIdAvailable = false;
      this.formBuildFunction();
    }
  }
  ngOnChanges(): void {
    if (this.updateStatusForm) {
      this.tabIndex = '1';
      this.formBuildFunction();
      this.getAndSetValues();
    }
  }
  formBuildFunction(): void {
    this.updateStatusForm = this.fb1.group({
      Status: ['', [Validators.required]],
    });
  }
  createFormCopy(): void {
    this.updateStatusFormCopy = Object.assign({}, this.updateStatusForm.value);
    console.log('init form copy ');
    console.log(this.updateStatusFormCopy);
    this.haveChanges = null;
    console.log('have changes ? ' + this.haveChanges);

  }
  subscribeToFormValChange(): void {
    if (this.updateStatusFormCopy) {
      this.updateStatusForm.valueChanges.subscribe(value => {
        if (
          this.updateStatusFormCopy.Status !== value.Status ) {
          this.haveChanges = true;
          console.log('have changes? ' + this.haveChanges);
        } else {
          this.haveChanges = false;
          console.log('have changes? ' + this.haveChanges);
        }
        console.log('valid ? ' + this.updateStatusForm.valid);
      });
    }
  }
  get Status(): AbstractControl {
    return this.updateStatusForm.get('Status');
  }
  onCancelEdit(): void {
    this.edit = !this.edit;
    this.updateStatusForm.reset();
    this.updateStatusForm.setValue(this.updateStatusFormCopy);
  }
  public saveChangesDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Are you sure?',
        message: 'Save changes with ' + this.complaintIDChild + ' ' + this.subComplaintIDChild + '? ',
        name: '',
        button1: 'Cancel',
        button2: 'Save'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(`Dialog result: ${result}`);
        this.onUpdate();
      } else {
        console.log(`Dialog result: ${result}`);
      }
    });
  }

  getAndSetValues(): void {
    if (this.complaintIDChild && this.subComplaintIDChild) {
      // tslint:disable-next-line:max-line-length
      this.http1.post<any>(`http://localhost:3000/accountCoordinator/get-selected-acccomplaint-profile-details`, {selectedComplaintID: this.complaintIDChild, selectedsubComplaintID: this.subComplaintIDChild})
        .subscribe(
          response => {
            this.Status.setValue(response.Status);
            this.createFormCopy();
            this.subscribeToFormValChange();

           // this.COMPLAINT_GENERAL_DATA = response.generalData[0];
            // this.dataSource = new MatTableDataSource<IUserGeneral>(this.USER_GENERAL_DATA);
          },
          error => {
            console.log(error);
          }
        );
    }

  }
  onUpdate(): void {
    const statusUpdateForm = this.updateStatusForm.value;
    this.accoorcomplaintService.updateStatus(this.updateStatusForm.value, this.complaintIDChild, this.subComplaintIDChild)
      .subscribe(
        response => {
          console.log('Update Success!(frontend)', response);
          this.edit = false;
          this.getAndSetValues();
        },
        error => {
          console.error('Update Error!(frontend)', error);
        }
      );
  }
  public backToAllComplaints(): void {
    this.accoorcomplaintService.ChangeComplaintProfileModeBooleanSubjectValue(false);
    this.accoorcomplaintService.ChangeComplaintIDSubjectNumberValue(null);
  }

}
