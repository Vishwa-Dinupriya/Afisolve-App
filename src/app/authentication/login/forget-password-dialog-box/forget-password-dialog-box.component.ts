import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ForgetPasswordService} from '../forget-password.service';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {checkPasswords} from '../../shared/password.validator';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {OtpService} from '../../../shared/otp-service/otp.service';
import {MyErrorStateMatcher} from '../../signup/signup.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-forget-password-dialog-box',
  templateUrl: './forget-password-dialog-box.component.html',
  styleUrls: ['./forget-password-dialog-box.component.css']
})
export class ForgetPasswordDialogBoxComponent implements OnInit {
  @ViewChild('myForm2') myForm2;

  otpSent;

  forgetPasswordForm1: FormGroup;
  forgetPasswordForm2: FormGroup;

  hidePassword = true;
  hideConfirmPassword = true;

  matcher = new MyErrorStateMatcher();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public otpService: OtpService,
              public forgetPasswordService: ForgetPasswordService,
              private fb1: FormBuilder,
              private http1: HttpClient) {
  }

  ngOnInit(): void {
    this.otpSent = false;
    this.forgetPasswordForm1 = this.fb1.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.forgetPasswordForm2 = this.fb1.group({
      otp: ['', [Validators.required, Validators.minLength(8)]],
      passwordGroup: this.fb1.group({
        password: ['', [Validators.required]],
        confirmPassword: [''],
      }, {validators: checkPasswords})
    });
  }

  get email(): AbstractControl {
    return this.forgetPasswordForm1.get('email');
  }

  get otp(): AbstractControl {
    return this.forgetPasswordForm2.get('otp');
  }

  get password(): AbstractControl {
    return this.forgetPasswordForm2.get('abc.password');
  }

  get confirmPassword(): AbstractControl {
    return this.forgetPasswordForm2.get('abc.confirmPassword');
  }

  onCancel1(): void {
    this.forgetPasswordForm1.reset();
  }

  onCancel2(): void {
    this.forgetPasswordForm2.reset();
  }

  sendOtpToEmailFromServerSide(): void {
    this.forgetPasswordService.changeForgetPasswordEmailSubjectStringValue(this.email.value);
    this.http1.post<any>(`http://localhost:3000/authentication/sendOtpToEmail`, {userEnteredEmail: this.email.value})
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
    this.forgetPasswordService.changeNewPasswordSubjectStringValue(this.password.value);
  }

}
