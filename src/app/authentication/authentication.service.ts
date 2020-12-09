import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  registerUrl = 'http://localhost:3000/authentication/register';
  loginUrl = 'http://localhost:3000/authentication/login';

  constructor(private http1: HttpClient) {
  }

  register(userData): Observable<any> {
    return this.http1.post<any>(this.registerUrl, userData);
  }

  login(userData): Observable<any> {
    return this.http1.post<any>(this.loginUrl, userData);
  }

  ifLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get token(): string {
    try {
      return localStorage.getItem('token');
    } catch (Exception) {
      return null;
    }
  }

}
