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
  forgetPasswordUrl = 'http://localhost:3000/authentication/forget-password';
  roleChangeUrl = 'http://localhost:3000/authentication/role-change';
  changeOwnPasswordUrl = 'http://localhost:3000/authentication/change-own-password';

  constructor(private http1: HttpClient,
              private router: Router) {
  }

  signup(userData, otp, otpID): Observable<any> {
    return this.http1.post<any>(this.signupUrl, {userData, otp, otpID});
  }

  login(userData): Observable<any> {
    return this.http1.post<any>(this.loginUrl, userData);
  }

  forgetPassword(forgetPasswordEmail, newPassword, otp, otpID): Observable<any> {
    return this.http1.post<any>(this.forgetPasswordUrl, {forgetPasswordEmail, newPassword, otp, otpID});
  }

  changePassword(changePasswordEmail, newPassword, otp, otpID): Observable<any> {
    return this.http1.post<any>(this.changeOwnPasswordUrl, {changePasswordEmail, newPassword, otp, otpID});
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  roleChange(userData): Observable<any> {
    return this.http1.post<any>(this.roleChangeUrl, userData);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userID');
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
