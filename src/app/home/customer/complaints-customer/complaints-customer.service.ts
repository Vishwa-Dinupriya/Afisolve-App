import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsCustomerService {

  isComplaintProfileMode: boolean;
  complaintIdParent: number;

  private isComplaintProfileModeSubjectBoolean: Subject<boolean> = new Subject<boolean>();
  private complaintIdParentSubjectNumber: Subject<number> = new Subject<number>();

  constructor() {
    this.isComplaintProfileModeSubjectBoolean.subscribe(value => this.isComplaintProfileMode = value);
    this.complaintIdParentSubjectNumber.subscribe(value => this.complaintIdParent = value);
  }

  changeIsComplaintProfileModeSubjectBooleanValue(newIsProfileModeValue: boolean): void {
    this.isComplaintProfileModeSubjectBoolean.next(newIsProfileModeValue);
  }

  changeComplaintIdParentSubjectNumberValue(newUserEmailParentValue: number): void {
    this.complaintIdParentSubjectNumber.next(newUserEmailParentValue);
  }
}
