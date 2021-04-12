 import { Injectable } from '@angular/core';
 import {HttpClient} from '@angular/common/http';
 import {Observable, pipe, Subject} from 'rxjs';
 import {Router} from '@angular/router';
 import {tap} from 'rxjs/operators';
 import {environment} from '../../../environments/environment';

 // @ts-ignore
 @Injectable({
  providedIn: 'root'
})
export class PastnameService {


  constructor(private http1: HttpClient,  private router: Router) {
  }

   // tslint:disable-next-line:typedef
  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

   // tslint:disable-next-line:typedef
   get refreshNeededformsg$(){
     return this._refreshNeededformsg$;
   }

   // tslint:disable-next-line:typedef
   get refreshNeededforacname$(){
     return this._refreshNeededforacname$;
   }

  accnurl = environment.project_manager_api_url + '/old-name'; // old acc. name send
  oldhistoryurl = environment.project_manager_api_url + '/update-history-previous';
  newhistoryurl = environment.project_manager_api_url + '/update-history-new';
  newaccurl = environment.project_manager_api_url + '/update-name';
  reminderurl = environment.project_manager_api_url + '/update-reminder';
  timeurl = environment.project_manager_api_url + '/update-time';


   caccnurl = environment.ceo_api_url + '/old-name';
   coldhistoryurl = environment.ceo_api_url + '/update-history-previous';
   cnewhistoryurl = environment.ceo_api_url + '/update-history-new';
   cnewaccurl = environment.ceo_api_url + '/update-name';
   creminderurl = environment.ceo_api_url + '/update-reminder';
   pmsgsendurl = environment.project_manager_api_url + '/send-msg';
   cpmsgsendurl = environment.ceo_api_url + '/send-msgg';

   // tslint:disable-next-line:variable-name
   private _refreshNeeded$ = new Subject<void>();
   // tslint:disable-next-line:variable-name
   private _refreshNeededformsg$ = new Subject<void>();


   // tslint:disable-next-line:variable-name
   private _refreshNeededforacname$ = new Subject<void>();


   public subject = new Subject<any>();

// old name eka send
   passn(user: string[]): Observable<any> {
     return this.http1.put<any>(this.accnurl, user);
  }

  // new name eka send
   newacname(selectedValue: string): Observable<any> {
    return this.http1
      .put<any>(this.newaccurl, selectedValue)
     // tslint:disable-next-line:align
       .pipe(
         tap(() => {
           this._refreshNeededforacname$.next();
         }
       )
     );
  }


   // remider eka send
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

   // changing history ekata ywnwa acc.coordi lwa wenas krddi
   newhistory(user: string[]): Observable<any> {
     return this.http1.put<any>(this.oldhistoryurl, user);
   }

   // history eka update krnwa acc. new name eka deddi
   updatehistory(selectedValue: string): Observable<any> {
     return this.http1.put<any>(this.newhistoryurl, selectedValue);
   }




// ...................................................................................................................


   // ceo.js & ceo.component.ts athara service tika

   // old name eka
   cpassn(user: string[]): Observable<any> {
     return this.http1.put<any>(this.caccnurl, user);
   }

   // new name eka send
   cnewacname(selectedValue: string): Observable<any> {
     return this.http1
       .put<any>(this.cnewaccurl, selectedValue)
       // tslint:disable-next-line:align
       .pipe(
         tap(() => {
             this._refreshNeededforacname$.next();
           }
         )
       );
   }

   // reminder eka
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

   // acc. change krddi history yt
   cnewhistory(user: string[]): Observable<any> {
     return this.http1.put<any>(this.coldhistoryurl, user);
   }

   // acc. change krddi history update krnn
   cupdatehistory(selectedValue: string): Observable<any> {
     return this.http1.put<any>(this.cnewhistoryurl, selectedValue);
   }





   // ................................Chat box eka ..............................................



   // projecct manger msg ekk ywddi
   newmsg(user: string[]): Observable<any> {
     return this.http1
       .put<any>(this.pmsgsendurl, user)
       // tslint:disable-next-line:align
       .pipe(
         tap(() => {
             this._refreshNeededformsg$.next();
           }
         )
       );
   }

   // ceo msg ekk ywaddi.........................
   cnewmsg(user: string[]): Observable<any> {
     return this.http1
       .put<any>(this.cpmsgsendurl, user)
       // tslint:disable-next-line:align
       .pipe(
         tap(() => {
             this._refreshNeededformsg$.next();
           }
         )
       );
   }
}
