import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {AddNewComplaintService} from './add-new-complaint.service';
import {DialogBoxSelectPictureComponent} from '../../../shared/dialog-box-select-picture/dialog-box-select-picture.component';
import {environment} from '../../../../environments/environment';
import {ComplaintsCustomerService} from '../complaints-customer/complaints-customer.service';

@Component({
  selector: 'app-add-new-complaint',
  templateUrl: './add-new-complaint.component.html',
  styleUrls: ['./add-new-complaint.component.css']
})
export class AddNewComplaintComponent implements OnInit, OnChanges {
  @Input() reqProductID: number;
  @ViewChild('myForm') myForm;
  addComplaintForm: FormGroup;
  productIDList;
  productNameList;

  imageAttachments = [];
  lodgeBtnMargin: number;

  constructor(
    private fb1: FormBuilder,
    private router: Router,
    private http1: HttpClient,
    public dialog: MatDialog,
    public addNewComplaintService: AddNewComplaintService,
  ) {
    this.addNewComplaintService.isLodgeComplaintModeSubjectBoolean.subscribe(
      value => {
        value ? this.lodgeBtnMargin = 86 : this.lodgeBtnMargin = 94;
      });
  }

  ngOnInit(): void {
    this.lodgeBtnMargin = 94;
    this.formBuildFunction();
    this.http1.post<any>(`http://localhost:3000/customer/get-all-products`, {}).subscribe(
      response => {
        this.productIDList = response.data.map(value => value.productID);
        this.productNameList = response.data.map(value => value.productName);
      }, error => {
        console.log(error);
      }
    );
  }

  ngOnChanges(): void {
    if (this.addComplaintForm && this.reqProductID) {
      this.formBuildFunction();
      this.productID.setValue(this.reqProductID);
    }
  }

  formBuildFunction(): void {
    this.addComplaintForm = this.fb1.group({
      productID: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get productID(): AbstractControl {
    return this.addComplaintForm.get('productID');
  }

  get description(): AbstractControl {
    return this.addComplaintForm.get('description');
  }

  get complaintCategory(): AbstractControl {
    return this.addComplaintForm.get('complaintCategory');
  }

  onCancelEdit(): void {
    this.addComplaintForm.reset();
    this.addNewComplaintService.changeIsLodgeComplaintModeSubjectBooleanValue(false);
  }

  public saveChangesDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Are you sure?',
        message: 'Lodge complaint with this product? ',
        name: '',
        button1: 'Cancel',
        button2: 'Save'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const newComplaint = this.addComplaintForm.value;
        newComplaint.Images = this.imageAttachments;

        this.http1.post<any>(environment.customerApiUrl + `/lodge-complaint`, newComplaint).subscribe(
          response => {
            // console.log(response);
            this.imageAttachments = [];
            const dialogRef2 = this.dialog.open(DialogBoxComponent, {
              data: {
                title: 'Success!',
                message: 'Complaint successfully lodged! ',
                name: ' ',
                button1: '',
                button2: 'Ok'
              }
            });
            dialogRef2.afterClosed().subscribe(result2 => {
              // console.log(`Dialog result: ${result}`);
              this.myForm.resetForm();
              if (result2 === true) {

              } else {

              }
            });
          }, error => {
            console.log(error);
            const dialogRef2 = this.dialog.open(DialogBoxComponent, {
              data: {
                title: 'Failed!',
                message: 'Something went wrong! ',
                name: ' ',
                button1: '',
                button2: 'Retry'
              }
            });
            dialogRef2.afterClosed().subscribe(result2 => {
              // console.log(`Dialog result: ${result}`);
              this.myForm.resetForm();
              if (result2 === true) {

              } else {

              }
            });
          }
        );
      } else {
      }
    });
  }

  openDialog(n: number): void {
    let img;
    if (n === -1) {
      img = '../../../../assets/img/add-image-icon.jpg';
    } else {
      img = this.imageAttachments[n];
    }
    const dialogRef = this.dialog.open(DialogBoxSelectPictureComponent, {
      // width: '50%'
      data: {
        currentPicture: img
      }
    });

    dialogRef.afterClosed().subscribe(picture => {
      if (picture !== '' && picture !== undefined) {
        if (n !== -1) {
          this.imageAttachments[n] = picture;
        } else {
          this.imageAttachments.push(picture);
        }
        console.log(this.imageAttachments);
      }
    });

  }

  removeSelectedImage(index: number): void {
    this.imageAttachments[index] = null;
    for (let i = index; i < this.imageAttachments.length - 1; i++) {
      this.imageAttachments[i] = this.imageAttachments[i + 1];
    }
    this.imageAttachments.pop();
  }
}
