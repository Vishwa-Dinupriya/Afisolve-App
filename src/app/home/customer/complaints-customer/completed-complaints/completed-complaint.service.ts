import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompletedComplaintService {
  ratedValue: number;
  feedback: string;
  subComplaintDescription: string;

  private ratedValueSubjectNumber: Subject<number> = new Subject<number>();
  private feedbackSubjectString: Subject<string> = new Subject<string>();
  private subComplaintDescriptionSubjectString: Subject<string> = new Subject<string>();

  constructor() {
    this.ratedValueSubjectNumber.subscribe(value => this.ratedValue = value);
    this.feedbackSubjectString.subscribe(value => this.feedback = value);
    this.subComplaintDescriptionSubjectString.subscribe(value => this.subComplaintDescription = value);
  }

  changeRatedValueSubjectNumberValue(newRatedValue: number): void {
    this.ratedValueSubjectNumber.next(newRatedValue);
  }

  changeFeedbackSubjectStringValue(newFeedbackValue: string): void {
    this.feedbackSubjectString.next(newFeedbackValue);
  }

  changeSubComplaintDescriptionSubjectStringValue(newSubComplaintDescriptionValue: string): void {
    this.subComplaintDescriptionSubjectString.next(newSubComplaintDescriptionValue);
  }

}
