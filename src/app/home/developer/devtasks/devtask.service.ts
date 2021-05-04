import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevtaskService {
  updatetaskstatusUrl = environment.developerApiUrl + '/update-devtask-status';
  isTaskProfileMode: boolean;
  taskIdParentValue: number;
  taskID: number;
  // ------ //
  private isTaskProfileModeSubjectBoolean: Subject<boolean> = new Subject<boolean>();
  private taskIDSubjectNumber: Subject<number> = new Subject<number>();

  constructor(private http1: HttpClient, private router: Router) {
    this.isTaskProfileModeSubjectBoolean.subscribe(value => this.isTaskProfileMode = value); // subscribe to subject
    this.taskIDSubjectNumber.subscribe(value => this.taskIdParentValue = value);
  }
  // ------- //
  ChangeTaskProfileModeBooleanSubjectValue(newValue: boolean): void {
    this.isTaskProfileModeSubjectBoolean.next(newValue);
  }
  ChangeTaskIDSubjectNumberValue(newValue: number): void {
    this.taskIDSubjectNumber.next(newValue);
  }
  updatetaskstatus(userData): Observable<any> {
    return this.http1.post<any>(this.updatetaskstatusUrl, userData);
  }
}
