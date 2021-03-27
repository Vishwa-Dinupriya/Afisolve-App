 import { Injectable } from '@angular/core';
 import {HttpClient} from '@angular/common/http';
 import {Observable} from 'rxjs';
 import {Router} from '@angular/router';

 // @ts-ignore
 @Injectable({
  providedIn: 'root'
})
export class PastnameService {
  accnurl = 'http://localhost:3000/projectManager/old-name';
  oldhistoryurl = 'http://localhost:3000/projectManager/update-history-previous';
  newhistoryurl = 'http://localhost:3000/projectManager/update-history-new';
  newaccurl = 'http://localhost:3000/projectManager/update-name';
  reminderurl = 'http://localhost:3000/projectManager/update-reminder';
  timeurl = 'http://localhost:3000/projectManager/update-time';


  constructor(private http1: HttpClient,  private router: Router) {
  }

   passn(user: string[]): Observable<any> {
    return this.http1.put<any>(this.accnurl, user);
  }

   newacname(selectedValue: string): Observable<any> {
    return this.http1.put<any>(this.newaccurl, selectedValue);
  }

   reminder(user: string[]): Observable<any> {
     return this.http1.post<any>(this.reminderurl, user);
   }

   time(selectedValue: any): Observable<any> {
     return this.http1.post<any>(this.timeurl, selectedValue);
   }

   newhistory(user: string[]): Observable<any> {
     return this.http1.put<any>(this.oldhistoryurl, user);
   }

   updatehistory(selectedValue: string): Observable<any> {
     return this.http1.put<any>(this.newhistoryurl, selectedValue);
   }

}


