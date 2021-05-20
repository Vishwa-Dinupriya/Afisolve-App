import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {checkPasswords} from '../../../authentication/shared/password.validator';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {OtpService} from '../../../shared/otp-service/otp.service';
import {MyErrorStateMatcher} from '../../../authentication/signup/signup.component';
import {HttpClient} from '@angular/common/http';
import {ChangePasswordService} from './change-password.service';

@Component({
  selector: 'app-change-password-dialog-box',
  templateUrl: './change-password-dialog-box.component.html',
  styleUrls: ['./change-password-dialog-box.component.css']
})
export class ChangePasswordDialogBoxComponent implements OnInit {
  @ViewChild('myForm2') myForm2;

  otpSent;

  forgetPasswordForm2: FormGroup;

  hidePassword = true;
  hideConfirmPassword = true;

  matcher = new MyErrorStateMatcher();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public otpService: OtpService,
              public changePasswordService: ChangePasswordService,
              private fb1: FormBuilder,
              private http1: HttpClient) {
  }

  ngOnInit(): void {
    this.otpSent = false;

    this.forgetPasswordForm2 = this.fb1.group({
      otp: ['', [Validators.required, Validators.minLength(8)]],
      passwordGroup: this.fb1.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
      }, {validators: checkPasswords})
    });
  }

  get otp(): AbstractControl {
    return this.forgetPasswordForm2.get('otp');
  }

  get password(): AbstractControl {
    return this.forgetPasswordForm2.get('passwordGroup.password');
  }

  get confirmPassword(): AbstractControl {
    return this.forgetPasswordForm2.get('passwordGroup.confirmPassword');
  }

  onCancel(): void {
    this.forgetPasswordForm2.reset();
  }

  sendOtpToEmailFromServerSide(): void {
    this.changePasswordService.changeForgetPasswordEmailSubjectStringValue(this.data.userEmail);
    this.http1.post<any>(`http://localhost:3000/authentication/sendOtpToEmail`, {userEnteredEmail: this.data.userEmail})
      .subscribe(
        response => {
          console.log(response.otpID);
          this.otpService.changeOtpIDSubjectNumberValue(response.otpID);
          this.otpSent = true;
        }, error => {
          console.log(error);
        }
      );
  }

  sendOtpAndNewPasswordToServiceFiles(): void {
    this.otpService.changeOtpValueSubjectNumberValue(Number(this.otp.value));
    this.changePasswordService.changeNewPasswordSubjectStringValue(this.password.value);
  }

}
