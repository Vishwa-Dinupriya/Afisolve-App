import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {forbiddenNameValidator1} from '../shared/user-name.validator';
import {forbiddenNameValidator2} from '../shared/user-name.validator';
import {AuthenticationService} from '../authentication.service';
import {HomeService} from '../../home/home.service';
import {OtpDialogBoxComponent} from '../../shared/otp-dialog-box/otp-dialog-box.component';
import {DialogBoxComponent} from '../../shared/dialog-box/dialog-box.component';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {UsersService} from '../../home/admin/users/users.service';
import {OtpService} from '../../shared/otp-service/otp.service';
import {ForgetPasswordDialogBoxComponent} from './forget-password-dialog-box/forget-password-dialog-box.component';
import {ForgetPasswordService} from './forget-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public firstName: string;
  public userRoles;

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  constructor(private fb1: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private homeService: HomeService,
              private http1: HttpClient,
              private dialog: MatDialog,
              public usersService: UsersService,
              private otpService: OtpService,
              private forgetPasswordService: ForgetPasswordService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb1.group({
      email: ['admin@gmail.com', [Validators.required, Validators.minLength(3), forbiddenNameValidator2(/password/)]],
      password: ['123', [Validators.required]]
    });
  }

  onLogin(): void {
    // console.log(this.loginForm.value);
    this.authenticationService.login(this.loginForm.value)
      .subscribe(
        response => {
          console.log('Login Success!(frontend)', response);
          localStorage.setItem('userID', response.userID);
          localStorage.setItem('userEmail', response.userEmail);
          localStorage.setItem('token', response.token);
          this.router.navigate([`../home/${response.defaultRole.toLowerCase()}`]);
        },
        error => {
          console.error('Login Error!(frontend)', error);
        }
      );
  }

  clickForgetPassword(): void {
    const dialogRef1 = this.dialog.open(ForgetPasswordDialogBoxComponent, {
      data: {
        title: 'Forget Password!',
        message: 'We sent an one-time-password(OTP) to ',
        name: ' ',
        button1: 'Cancel',
        button2: 'Done'
      }
    });

    dialogRef1.afterClosed().subscribe(result1 => {
      if (result1 === true) {
        // new password and otp send to back end
        this.authenticationService.forgetPassword(
          this.forgetPasswordService.forgetPasswordEmail,
          this.forgetPasswordService.newPassword,
          this.otpService.otp,
          this.otpService.otpID)
          .subscribe(
            response => {
              console.log('Success!(frontend)', response);
              const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  image: ' ',
                  title: 'Success!',
                  message: 'Password Changed Successfully! Please login with new password ',
                  name: ' ',
                  button1: '',
                  button2: 'Ok'
                }
              });

              dialogRef2.afterClosed().subscribe(result2 => {
                console.log(`Dialog result: ${result2}`);
                if (result2 === true) {

                } else {
                  this.usersService.ChangeCreateUserModeBooleanSubjectValue(false);
                }
              });
            },
            error => {
              console.error('Error!(frontend)', error);
              const dialogRef3 = this.dialog.open(DialogBoxComponent, {
                data: {
                  image: '',
                  title: 'Failed!',
                  message: error,
                  name: ' ',
                  button1: '',
                  button2: 'Retry'
                }
              });

              dialogRef3.afterClosed().subscribe(result3 => {
                console.log(`Dialog result: ${result3}`);
                if (result3 === true) {

                } else {

                }
              });
            }
          );
      } else {
        console.log(`Dialog result: ${result1}`);

      }
    });
  }
}
