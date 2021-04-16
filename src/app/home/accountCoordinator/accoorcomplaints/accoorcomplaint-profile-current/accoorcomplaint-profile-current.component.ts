import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {AccoorcomplaintsService} from '../accoorcomplaints.service';
import {environment} from '../../../../../environments/environment';

export interface IComplaintDetailsAcc {
  complaintID: number;
  subComplaintID: number;
  description: string;
  finishedDate: string;
  lastDateOfPending: string;
  productID: number;
  projectManagerEmail: string;
  projectManagerFirstName: string;
  projectManagerLastName: string;
  projectManagerContactNumber: number;
  wipStartDate: string;
}

@Component({
  selector: 'app-accoorcomplaint-profile-current',
  templateUrl: './accoorcomplaint-profile-current.component.html',
  styleUrls: ['./accoorcomplaint-profile-current.component.css']
})
export class AccoorcomplaintProfileCurrentComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() complaintIDChild: number;
  @Input() subComplaintIDChild: number;
  COMPLAINT_DETAILS_DATA: IComplaintDetailsAcc;
  tabIndex;
  ComplaintIdAvailable;
  //
  constructor(private router: Router,
              private http1: HttpClient,
              public dialog: MatDialog,
              public accoorcomplaintService: AccoorcomplaintsService) { }
              // Get the details of the selected complaint
  ngOnChanges(): void {
    this.tabIndex = 0;
    if (this.complaintIDChild) {
      this.ComplaintIdAvailable = true;
      this.http1.post<any>( environment.accountCoordinatorApiUrl + `/get-selected-accoorcomplaint-details-current`, {
        complaintID: this.complaintIDChild,
        subComplaintID: this.subComplaintIDChild
      })
        .subscribe(
          response => {
            this.COMPLAINT_DETAILS_DATA = response.data;
            console.log(this.COMPLAINT_DETAILS_DATA);
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
    if (!this.complaintIDChild) {
      this.ComplaintIdAvailable = false;
    }
  }
  ngAfterViewInit(): void {

  }
  public backToAllComplaints(): void {
    this.accoorcomplaintService.ChangeComplaintProfileModeBooleanSubjectValue(false);
    this.accoorcomplaintService.ChangeComplaintIDSubjectNumberValue(null);
  }

}
