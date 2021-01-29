import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  name: string;
  private nameChange: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
    this.nameChange.subscribe(value => this.name = value); // subscribe to observable
  }

  changeName(name: string): void {
    this.nameChange.next(name);
  }

  getUserDetails(): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/users/get-user-login-details`, {});
  }

}
