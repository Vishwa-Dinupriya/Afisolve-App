import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {

  profileModeValue: boolean;
  complaintIdParentValue: number;

  private profileModeBooleanSubject: Subject<boolean> = new Subject<boolean>();
  private complaintIdParentNumberSubject: Subject<number> = new Subject<number>();

  constructor() {
    this.profileModeBooleanSubject.subscribe(value => this.profileModeValue = value);
    this.complaintIdParentNumberSubject.subscribe(value => this.complaintIdParentValue = value);
  }

  changeProfileModeBooleanSubjectValue(newProfileModeValue: boolean): void {
    this.profileModeBooleanSubject.next(newProfileModeValue);
  }

  changeComplaintIdParentNumberSubjectValue(newComplaintIdParentValue: number): void {
    this.complaintIdParentNumberSubject.next(newComplaintIdParentValue);
  }
}
