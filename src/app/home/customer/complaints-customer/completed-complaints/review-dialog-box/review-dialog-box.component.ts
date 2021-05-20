import {Component, OnInit, Inject, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CompletedComplaintService} from '../completed-complaint.service';

@Component({
  selector: 'app-review-dialog-box',
  templateUrl: './review-dialog-box.component.html',
  styleUrls: ['./review-dialog-box.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ReviewDialogBoxComponent implements OnInit {

  @Input() rating = 3;
  @Input() starCount = 5;
  @Input() color = 'accent';
  @Output() ratingUpdated = new EventEmitter();

   ratingArr = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public completedComplaintService: CompletedComplaintService) {
  }

  ngOnInit(): void {
    // console.log('Total starCount: ' + this.starCount);
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    this.completedComplaintService.changeRatedValueSubjectNumberValue(this.rating);
  }

  onClick(ratedValue: number): boolean {
    this.rating = ratedValue;
    this.ratingUpdated.emit(ratedValue);
    this.completedComplaintService.changeRatedValueSubjectNumberValue(ratedValue);
    return false;
  }

  showIcon(index: number): 'star' | 'star_border' {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  sendFeedbackToServiceFile(value: string): void {
    this.completedComplaintService.changeFeedbackSubjectStringValue(value);
  }

  sendSubComplaintToServiceFile(value: string): void {
    this.completedComplaintService.changeSubComplaintDescriptionSubjectStringValue(value);
  }
}

export enum StarRatingColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn'
}
