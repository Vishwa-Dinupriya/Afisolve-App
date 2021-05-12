import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsCustomerService {

  isComplaintProfileMode: boolean;
  isCommentSectionMode: boolean;
  complaintIdParent: number;
  subComplaintIdParentValue: number;

  private isComplaintProfileModeSubjectBoolean: Subject<boolean> = new Subject<boolean>();
  private isCommentSectionModeSubjectBoolean: Subject<boolean> = new Subject<boolean>();
  private complaintIdParentSubjectNumber: Subject<number> = new Subject<number>();
  private subComplaintIdParentNumberSubject: Subject<number> = new Subject<number>();

  constructor() {
    this.isComplaintProfileModeSubjectBoolean.subscribe(value => this.isComplaintProfileMode = value);
    this.isCommentSectionModeSubjectBoolean.subscribe(value => this.isCommentSectionMode = value);
    this.complaintIdParentSubjectNumber.subscribe(value => this.complaintIdParent = value);
    this.subComplaintIdParentNumberSubject.subscribe(value => this.subComplaintIdParentValue = value);
  }

  changeIsComplaintProfileModeSubjectBooleanValue(newIsProfileModeValue: boolean): void {
    this.isComplaintProfileModeSubjectBoolean.next(newIsProfileModeValue);
  }

  changeIsCommentSectionModeSubjectBooleanValue(newIsCommentSectionMode: boolean): void {
    this.isCommentSectionModeSubjectBoolean.next(newIsCommentSectionMode);
  }

  changeComplaintIdParentSubjectNumberValue(newUserEmailParentValue: number): void {
    this.complaintIdParentSubjectNumber.next(newUserEmailParentValue);
  }

  changeSubComplaintIdParentNumberSubjectValue(newSubComplaintIdParentValue: number): void {
    this.subComplaintIdParentNumberSubject.next(newSubComplaintIdParentValue);
  }
}
