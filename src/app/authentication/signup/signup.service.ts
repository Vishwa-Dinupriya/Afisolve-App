import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  otp: number;
  private otpValueSubjectNumber: Subject<number> = new Subject<number>();

  constructor() {
    this.otpValueSubjectNumber.subscribe(value => this.otp = value);
  }

  changeOtpValueSubjectNumberValue(newOtpValue: number): void {
    this.otpValueSubjectNumber.next(newOtpValue);
  }
}
