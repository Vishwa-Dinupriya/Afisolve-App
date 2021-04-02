import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  profileModeValue: boolean; // parent or child access this (accessing variable)
  complaintIdParentValue: number;
  subComplaintIdParentValue: number;

  //  accessing variable value is change through this subject type object.when we change value of this instantly change
  // variable value because in the  constructor we subscribe to this subject type object and we assign object's value to
  // variable value. so whenever subject type object values change then variable(profileModeValue) value also change.
  private profileModeBooleanSubject: Subject<boolean> = new Subject<boolean>(); // subject type object
  private complaintIdParentNumberSubject: Subject<number> = new Subject<number>();
  private subComplaintIdParentNumberSubject: Subject<number> = new Subject<number>();

  constructor() {
    // assign latest profileModeBooleanSubject value to profileModeValue variable
    this.profileModeBooleanSubject.subscribe(value => this.profileModeValue = value); // subscribe to subject
    this.complaintIdParentNumberSubject.subscribe(value => this.complaintIdParentValue = value);
    this.subComplaintIdParentNumberSubject.subscribe(value => this.subComplaintIdParentValue = value);
  }

  changeProfileModeBooleanSubjectValue(newProfileModeValue: boolean): void {
    this.profileModeBooleanSubject.next(newProfileModeValue); // change value of object (type of the object is 'subject')
  }

  changeComplaintIdParentNumberSubjectValue(newComplaintIdParentValue: number): void {
    this.complaintIdParentNumberSubject.next(newComplaintIdParentValue);
  }

  changeSubComplaintIdParentNumberSubjectValue(newSubComplaintIdParentValue: number): void {
    this.subComplaintIdParentNumberSubject.next(newSubComplaintIdParentValue);
  }

}
