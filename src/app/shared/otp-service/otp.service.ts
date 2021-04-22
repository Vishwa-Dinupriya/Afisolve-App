import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  otp: number;
  otpID: number;
  private otpValueSubjectNumber: Subject<number> = new Subject<number>();
  private otpIDSubjectNumber: Subject<number> = new Subject<number>();

  constructor() {
    this.otpValueSubjectNumber.subscribe(value => this.otp = value);
    this.otpIDSubjectNumber.subscribe(value => this.otpID = value);
  }

  changeOtpValueSubjectNumberValue(newOtpValue: number): void {
    this.otpValueSubjectNumber.next(newOtpValue);
  }
  changeOtpIDSubjectNumberValue(newOtpID: number): void {
    this.otpIDSubjectNumber.next(newOtpID);
  }
}
