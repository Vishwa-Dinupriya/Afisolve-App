import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url1 = 'http://localhost:3000/api/register';
  url2 = 'http://localhost:3000/api/login';

  constructor(private http1: HttpClient) {
  }

  register(userData): Observable<any> {
    return this.http1.post<any>(this.url1, userData);
  }

  login(userData): Observable<any> {
    return this.http1.post<any>(this.url2, userData);
  }

}
