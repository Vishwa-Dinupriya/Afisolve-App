import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  createtaskUrl = 'http://localhost:3000/accountCoordinator/create-task';
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
}
