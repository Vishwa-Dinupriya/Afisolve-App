import {HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ComplaintsService} from '../../admin/complaints/complaints.service';
import {ComplaintsCustomerService} from '../../customer/complaints-customer/complaints-customer.service';
import {DevtaskService} from '../../developer/devtasks/devtask.service';

export interface IComplaintDetailsAdmin {
  accountCoordinatorEmail: string;
  accountCoordinatorFirstName: string;
  accountCoordinatorLastName: string;
  complaintID: number;
  description: string;
  finishedDate: string;
  lastDateOfPending: string;
  productID: number;
  productName: string;
  projectManagerEmail: string;
  projectManagerFirstName: string;
  projectManagerLastName: string;
  statusID: number;
  statusName: string;
  subComplaintID: number;
  submittedDate: string;
  wipStartDate: string;
}

@Component({
  selector: 'app-complaint-profile',
  templateUrl: './complaint-profile.component.html',
  styleUrls: ['./complaint-profile.component.css']
})
export class ComplaintProfileComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() complaintIdChild: number;
  @Input() subComplaintIdChild: number;
  @Input() requestFrom: string;

  COMPLAINT_DETAILS_DATA: IComplaintDetailsAdmin;
  tabIndex;
  ComplaintIdAvailable;

  imageAttachments;

  constructor(private router: Router,
              private http1: HttpClient,
              public dialog: MatDialog,
              public complaintService: ComplaintsService,
              public complaintCustomerService: ComplaintsCustomerService,
              public devtaskService: DevtaskService) {
  }

  ngOnChanges(): void {
    this.tabIndex = 0;
    if (this.complaintIdChild) {
      this.ComplaintIdAvailable = true;
      this.http1.post<any>(`http://localhost:3000/` + this.requestFrom + `/get-selected-complaint-details`, {
        complaintID: this.complaintIdChild,
        subComplaintID: this.subComplaintIdChild
      })
        .subscribe(
          response => {
            this.COMPLAINT_DETAILS_DATA = response.data;
            this.imageAttachments = response.images;
            console.log(this.imageAttachments);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.ComplaintIdAvailable = false;
    }
  }

  ngOnInit(): void {
    this.tabIndex = 1;
    if (!this.complaintIdChild) {
      this.ComplaintIdAvailable = false;
    }
  }

  ngAfterViewInit(): void {

  }

  public backToAllComplaintsAdmin(): void {
    this.complaintService.changeProfileModeBooleanSubjectValue(false);
    this.complaintService.changeComplaintIdParentNumberSubjectValue(null);
    this.complaintService.changeSubComplaintIdParentNumberSubjectValue(null);
  }

  public backToAllComplaintsCustomer(): void {
    this.complaintCustomerService.changeIsComplaintProfileModeSubjectBooleanValue(false);
    this.complaintCustomerService.changeComplaintIdParentSubjectNumberValue(null);
    this.complaintCustomerService.changeSubComplaintIdParentNumberSubjectValue(null);
  }

  public backToAllComplaintsDeveloper(): void {
    this.devtaskService.changeProfileModeBooleanSubjectValue(false);
    this.devtaskService.changeComplaintIdParentNumberSubjectValue(null);
    this.devtaskService.changeSubComplaintIdParentNumberSubjectValue(null);
  }

  removeSelectedImage(index: number): void {
    this.imageAttachments[index] = null;
    for (let i = index; i < this.imageAttachments.length - 1; i++) {
      this.imageAttachments[i] = this.imageAttachments[i + 1];
    }
    this.imageAttachments.pop();
  }
}
