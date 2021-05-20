import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  forgetPasswordEmail: string;
  newPassword: string;

  private newPasswordSubjectString: Subject<string> = new Subject<string>();
  private forgetPasswordEmailSubjectString: Subject<string> = new Subject<string>();

  constructor() {
    this.newPasswordSubjectString.subscribe(value => this.newPassword = value);
    this.forgetPasswordEmailSubjectString.subscribe(value => this.forgetPasswordEmail = value);
  }

  changeNewPasswordSubjectStringValue(newPasswordValue: string): void {
    this.newPasswordSubjectString.next(newPasswordValue);
  }
  changeForgetPasswordEmailSubjectStringValue(forgetPasswordEmailValue: string): void {
    this.forgetPasswordEmailSubjectString.next(forgetPasswordEmailValue);
  }
}
