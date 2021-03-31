import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  createtaskUrl = 'http://localhost:3000/accountCoordinator/create-task';

  constructor(private http1: HttpClient, private router: Router) {
  }
  createtask(userData): Observable<any> {
    return this.http1.post<any>(this.createtaskUrl, userData);
  }
}
