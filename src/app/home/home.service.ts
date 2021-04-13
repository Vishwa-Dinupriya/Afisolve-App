import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  drawer: boolean; // parent or child access this
  userEmail: string;
  userProfileMode: boolean;

  private toggleDrawerChange: Subject<boolean> = new Subject<boolean>();
  userEmailStringSubject: Subject<string> = new Subject<string>();
  private userProfileModeBooleanSubject: Subject<boolean> = new Subject<boolean>();

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
}
