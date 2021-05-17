import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FeedbacksService} from '../../admin/feedbacks/feedbacks.service';

export interface IFeedbackDetails {
  accountCoordinatorEmail: string;
  accountCoordinatorFirstName: string;
  accountCoordinatorLastName: string;
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  complaintID: number;
  description: string;
  finishedDate: string;
  lastDateOfPending: string;
  productID: number;
  productName: string;
  projectManagerEmail: string;
  projectManagerFirstName: string;
  projectManagerLastName: string;
  satisfaction: number;
  subComplaintID: number;
  submittedDate: string;
  wipStartDate: string;
  nOfSubComplaints: number;
}

@Component({
  selector: 'app-feedback-profile',
  templateUrl: './feedback-profile.component.html',
  styleUrls: ['./feedback-profile.component.css']
})
export class FeedbackProfileComponent implements OnInit, OnChanges {
  @Input() complaintIdChild: number;

  ComplaintIdAvailable;
  FEEDBACK_DETAILS_DATA: IFeedbackDetails;

  starCount = 5;
  ratingArr = [];

  constructor(private http1: HttpClient,
              public feedbacksService: FeedbacksService) {
  }

  ngOnChanges(): void {
    if (this.complaintIdChild) {
      this.ComplaintIdAvailable = true;
      this.http1.post<any>(`http://localhost:3000/admin/get-selected-feedback-details`, {complaintID: this.complaintIdChild})
        .subscribe(
          response => {
            console.log(response.data);
            this.FEEDBACK_DETAILS_DATA = response.data;
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
    if (!this.complaintIdChild) {
      this.ComplaintIdAvailable = false;
    }
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  showIcon(index: number, ratedValue: number): 'star' | 'star_border' {
    if (ratedValue >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  public backToAllFeedbacks(): void {
    this.feedbacksService.changeProfileModeBooleanSubjectValue(false);
    this.feedbacksService.changeComplaintIdParentNumberSubjectValue(null);
  }
}
