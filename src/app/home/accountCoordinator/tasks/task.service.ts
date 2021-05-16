import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  createtaskUrl = environment.accountCoordinatorApiUrl + '/create-task';
  updateDeveloperUrl = environment.accountCoordinatorApiUrl + '/update-developer';
  createTaskMode: boolean;
  isTaskProfileMode: boolean;
  taskID: number;

  createTaskModeBooleanSubject: Subject<boolean> = new Subject<boolean>();
  isTaskProfileModeSubjectBoolean: Subject<boolean> = new Subject<boolean>();
  private taskIDSubjectNumber: Subject<number> = new Subject<number>();

  constructor(private http1: HttpClient, private router: Router) {
    this.createTaskModeBooleanSubject.subscribe(value => this.createTaskMode = value);
    this.isTaskProfileModeSubjectBoolean.subscribe(value => this.isTaskProfileMode = value);
    this.taskIDSubjectNumber.subscribe(value => this.taskID = value);
  }
  createtask(userData): Observable<any> {
    return this.http1.post<any>(this.createtaskUrl, userData);
  }
  ChangeCreateTaskModeBooleanSubjectValue(newCreateTaskModeValue: boolean): void {
    this.createTaskModeBooleanSubject.next(newCreateTaskModeValue);
  }
  ChangeTaskProfileModeBooleanSubjectValue(newValue: boolean): void {
    this.isTaskProfileModeSubjectBoolean.next(newValue);
  }
  ChangeTaskIDSubjectNumberValue(newValue: number): void {
    this.taskIDSubjectNumber.next(newValue);
  }
  updateDeveloper(userData): Observable<any> {
    return this.http1.post<any>(this.updateDeveloperUrl, userData);
  }
}
