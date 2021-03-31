import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  signupUrl = 'http://localhost:3000/authentication/register';
  loginUrl = 'http://localhost:3000/authentication/login';
  roleChangeUrl = 'http://localhost:3000/authentication/role-change';
  updateProfileUrl = 'http://localhost:3000/admin/update-selected-user-profile-details';

  constructor(private http1: HttpClient, private router: Router) {
  }

  signup(userData): Observable<any> {
    return this.http1.post<any>(this.signupUrl, userData);
  }

  login(userData): Observable<any> {
    return this.http1.post<any>(this.loginUrl, userData);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  roleChange(userData): Observable<any> {
    return this.http1.post<any>(this.roleChangeUrl, userData);
  }

  updateProfile(userData, oldEmail): Observable<any> {
    return this.http1.post<any>(this.updateProfileUrl, {userNewData: userData, emailOld: oldEmail});
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
