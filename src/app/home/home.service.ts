import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  drawer: boolean; // parent or child access this
  userEmail: string;
  userProfileMode: boolean;
  readUrl = 'http://localhost:3000/home/update-reading-status';

  // tslint:disable-next-line:typedef
  get refreshNeededformsg$() {
    return this._refreshNeededformsg$;
  }

  private toggleDrawerChange: Subject<boolean> = new Subject<boolean>();
  userEmailStringSubject: Subject<string> = new Subject<string>();
  private userProfileModeBooleanSubject: Subject<boolean> = new Subject<boolean>();
  // tslint:disable-next-line:variable-name
  private _refreshNeededformsg$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.toggleDrawerChange.subscribe(value => this.drawer = value); // next eken enne methnata
    this.userEmailStringSubject.subscribe(value => this.userEmail = value);
    this.userProfileModeBooleanSubject.subscribe(value => this.userProfileMode = value);
  }

  ToggleDrawer(toggleDrawer: boolean): void {
    this.toggleDrawerChange.next(toggleDrawer); // next kaallen thamai subscribe ekat call krnane
  }

  changeUserEmailStringSubjectValue(newValue: string): void {
    this.userEmailStringSubject.next(newValue);
  }

  changeUserProfileModeBooleanSubject(newValue: boolean): void {
    this.userProfileModeBooleanSubject.next(newValue); // next kaallen thamai subscribe ekat call krnane
  }

  changeReadStatus(user: string[]): Observable<any> {
    return this.http
      .post<any>(this.readUrl, user)
      // tslint:disable-next-line:align
      .pipe(
        tap(() => {
            this._refreshNeededformsg$.next();
          }
        )
      );
  }
}
