import {Injectable} from '@angular/core';
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

  constructor(private http1: HttpClient, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  // tslint:disable-next-line:typedef
  get refreshNeededCeo$() {
    return this._refreshNeededCeo$;
  }

  // tslint:disable-next-line:typedef
  get refreshNeededforacname$() {
    return this._refreshNeededforacname$;
  }

  // tslint:disable-next-line:typedef
  get refreshNeededforacnameceo$() {
    return this._refreshNeededforacnameceo$;
  }

  accnurl = environment.project_manager_api_url + '/old-name'; // old acc. name send
  oldhistoryurl = environment.project_manager_api_url + '/update-history-for-ac-change';
  newhistoryurl = environment.project_manager_api_url + '/update-history-new';
  newaccurl = environment.project_manager_api_url + '/update-name';
  reminderurl = environment.project_manager_api_url + '/update-reminder';
  timeurl = environment.project_manager_api_url + '/update-time';


  caccnurl = environment.ceo_api_url + '/old-name';
  coldhistoryurl = environment.ceo_api_url + '/update-history-for-ac-change';
  cnewhistoryurl = environment.ceo_api_url + '/update-history-new';
  cnewaccurl = environment.ceo_api_url + '/update-name';
  creminderurl = environment.ceo_api_url + '/update-reminder';
  pmsgsendurl = environment.project_manager_api_url + '/send-msg';

  // tslint:disable-next-line:variable-name
  private _refreshNeeded$ = new Subject<void>();
  // tslint:disable-next-line:variable-name
  private _refreshNeededforacnameceo$ = new Subject<void>();

  // tslint:disable-next-line:variable-name
  private _refreshNeededforacname$ = new Subject<void>();
  // tslint:disable-next-line:variable-name
  private _refreshNeededCeo$ = new Subject<void>();
  public subject = new Subject<any>();


// old name eka send
  passn(user: string[]): Observable<any> {
    return this.http1.put<any>(this.accnurl, user);
  }

  // new name eka send
  newacname(test, selectedValue): Observable<any> {
    return this.http1
      .post<any>(this.newaccurl, {a: test, b: selectedValue})
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
  newhistoryAc(test, selectedValue): Observable<any> {
    return this.http1
      .post<any>(this.oldhistoryurl, {a: test, b: selectedValue})
      .pipe(
        tap(() => {
            this._refreshNeededforacname$.next();
          }
        )
      );
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
  cnewacname(test, selectedValue): Observable<any> {
    return this.http1
      .post<any>(this.cnewaccurl, {a: test, b: selectedValue})
      .pipe(
        tap(() => {
            this._refreshNeededforacnameceo$.next();
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
            this._refreshNeededCeo$.next();
          }
        )
      );
  }

  // acc. change krddi history yt
  cnewhistoryAc(test, selectedValue): Observable<any> {
    return this.http1
      .post<any>(this.coldhistoryurl, {a: test, b: selectedValue})
      .pipe(
        tap(() => {
            this._refreshNeededforacnameceo$.next();
          }
        )
      );
  }


  // acc. change krddi history update krnn
  cupdatehistory(selectedValue: string): Observable<any> {
    return this.http1.put<any>(this.cnewhistoryurl, selectedValue);
  }
}
