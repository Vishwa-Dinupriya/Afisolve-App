import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  registerUrl = 'http://localhost:3000/authentication/register';
  loginUrl = 'http://localhost:3000/authentication/login';

  constructor(private http1: HttpClient, private router: Router) {
  }

  register(userData): Observable<any> {
    return this.http1.post<any>(this.registerUrl, userData);
  }

  login(userData): Observable<any> {
    return this.http1.post<any>(this.loginUrl, userData);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  get token(): string {
    try {
      return localStorage.getItem('token');
    } catch (Exception) {
      return null;
    }
  }

}
