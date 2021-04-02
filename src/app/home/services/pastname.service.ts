 import { Injectable } from '@angular/core';
 import {HttpClient} from '@angular/common/http';
 import {Observable, pipe, Subject} from 'rxjs';
 import {Router} from '@angular/router';
 import {tap} from 'rxjs/operators';

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


   caccnurl = 'http://localhost:3000/ceo/old-name';
   coldhistoryurl = 'http://localhost:3000/ceo/update-history-previous';
   cnewhistoryurl = 'http://localhost:3000/ceo/update-history-new';
   cnewaccurl = 'http://localhost:3000/ceo/update-name';
   creminderurl = 'http://localhost:3000/ceo/update-reminder';
   ctimeurl = 'http://localhost:3000/ceo/update-time';


  constructor(private http1: HttpClient,  private router: Router) {
  }

   // tslint:disable-next-line:variable-name
   private _refreshNeeded$ = new Subject<void>();

   // tslint:disable-next-line:typedef
  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

   passn(user: string[]): Observable<any> {
    return this.http1.put<any>(this.accnurl, user);
  }

   newacname(selectedValue: string): Observable<any> {
    return this.http1.put<any>(this.newaccurl, selectedValue);
  }

   // @ts-ignore
   // @ts-ignore
   reminder(user: string[]): Observable<any> {
     return this.http1
       .post<any>(this.reminderurl, user)
     // tslint:disable-next-line:align
      .pipe(
       tap(() => {
         this._refreshNeeded$.next();
         }
       )
     );
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







   // ceo.js & ceo.component.ts athara service tika

   cpassn(user: string[]): Observable<any> {
     return this.http1.put<any>(this.caccnurl, user);
   }

   cnewacname(selectedValue: string): Observable<any> {
     return this.http1.put<any>(this.cnewaccurl, selectedValue);
   }

   creminder(user: string[]): Observable<any> {
     return this.http1
       .post<any>(this.creminderurl, user)
       .pipe(
         tap(() => {
             this._refreshNeeded$.next();
           }
         )
       );
   }

   ctime(selectedValue: any): Observable<any> {
     return this.http1.post<any>(this.ctimeurl, selectedValue);
   }

   cnewhistory(user: string[]): Observable<any> {
     return this.http1.put<any>(this.coldhistoryurl, user);
   }

   cupdatehistory(selectedValue: string): Observable<any> {
     return this.http1.put<any>(this.cnewhistoryurl, selectedValue);
   }
}


