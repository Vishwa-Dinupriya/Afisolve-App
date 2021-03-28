import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  profileModeValue: boolean; // parent or child access this (accessing variable)
  complaintIdParentValue: string;

  //  accessing variable value is change through this subject type object.when we change value of this instantly change
  // variable value because in the  constructor we subscribe to this subject type object and we assign object's value to
  // variable value. so whenever subject type object values change then variable(profileModeValue) value also change.
  private profileModeBooleanSubject: Subject<boolean> = new Subject<boolean>(); // subject type object
  private complaintIdParentStringSubject: Subject<string> = new Subject<string>();

  constructor() {
    // assign latest profileModeBooleanSubject value to profileModeValue variable
    this.profileModeBooleanSubject.subscribe(value => this.profileModeValue = value); // subscribe to subject
    this.complaintIdParentStringSubject.subscribe(value => this.complaintIdParentValue = value);
  }

  changeProfileModeBooleanSubjectValue(newProfileModeValue: boolean): void {
    this.profileModeBooleanSubject.next(newProfileModeValue); // change value of object (type of the object is 'subject')
  }

  changeComplaintIdParentStringSubjectValue(newComplaintIdParentValue: string): void {
    this.complaintIdParentStringSubject.next(newComplaintIdParentValue);
  }

}
