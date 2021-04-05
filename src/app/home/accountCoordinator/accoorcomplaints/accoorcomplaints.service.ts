import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccoorcomplaintsService {
  private isCreateTaskModeSubjectBoolean: Subject<boolean> = new Subject<boolean>();
  addcomplaintUrl = 'http://localhost:3000/accountCoordinator/add-complaint';
  updatecomplaintstatusUrl = 'http://localhost:3000/accountCoordinator/update-common-complaint-status';
  updateStatusUrl = 'http://localhost:3000/accountCoordinator/update-selected-acccomplaint-profile-status';

  addComplaintMode: boolean;
  isComplaintProfileMode: boolean;
  complaintID: number;
  subComplaintID: number;

  addComplaintModeBooleanSubject: Subject<boolean> = new Subject<boolean>();
  isComplaintProfileModeSubjectBoolean: Subject<boolean> = new Subject<boolean>();
  private complaintIDSubjectNumber: Subject<number> = new Subject<number>();


  constructor(private http1: HttpClient, private router: Router) {
    this.addComplaintModeBooleanSubject.subscribe(value => this.addComplaintMode = value);
    this.isComplaintProfileModeSubjectBoolean.subscribe(value => this.isComplaintProfileMode = value);
    this.complaintIDSubjectNumber.subscribe(value => this.complaintID = value);
  }
  addcomplaint(userData): Observable<any> {
    return this.http1.post<any>(this.addcomplaintUrl, userData);
  }
  updatecomplaintstatus(userData): Observable<any> {
    return this.http1.post<any>(this.updatecomplaintstatusUrl, userData);
  }
  ChangeAddComplaintModeBooleanSubjectValue(newAddComplaintModeValue: boolean): void {
    this.addComplaintModeBooleanSubject.next(newAddComplaintModeValue);
  }
  ChangeComplaintProfileModeBooleanSubjectValue(newValue: boolean): void {
    this.isComplaintProfileModeSubjectBoolean.next(newValue);
  }
  ChangeComplaintIDSubjectNumberValue(newValue: number): void {
    this.complaintIDSubjectNumber.next(newValue);
  }
  updateStatus(Status, ID, subID): Observable<any> {
    return this.http1.post<any>(this.updateStatusUrl, {complaintNewStatus: Status, compID: ID, subcompID: subID});
  }
}
