import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {checkPasswords} from '../shared/password.validator';
import {AuthenticationService} from '../authentication.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {DialogBoxComponent} from '../../shared/dialog-box/dialog-box.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UsersService} from '../../home/admin/users/users.service';
import {HttpClient} from '@angular/common/http';
import {OtpDialogBoxComponent} from '../../shared/otp-dialog-box/otp-dialog-box.component';
import {OtpService} from '../../shared/otp-service/otp.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('myForm') myForm;

  userRegistrationForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  profilePicture: string;

  roleList: string[] = ['Customer', 'Account Coordinator', 'Developer', 'Project Manager', 'CEO', 'Admin'];
  selectedRoles: number [] = [];

  customerRoleSelected;
  nonCustomerRoleSelected;

  matcher = new MyErrorStateMatcher();

  constructor(
    private http1: HttpClient,
    private fb1: FormBuilder,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    public usersService: UsersService,
    private otpService: OtpService) {
  }

  ngOnInit(): void {
    this.userRegistrationForm = this.fb1.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb1.group({
        password: ['', [Validators.required]],
        confirmPassword: [''],
      }, {validators: checkPasswords}),
      roles: ['', [Validators.required]],
      defaultRole: ['', [Validators.required]],
      contactNumber: ['']
    });
  }

  get firstName(): AbstractControl {
    return this.userRegistrationForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.userRegistrationForm.get('lastName');
  }

  get email(): AbstractControl {
    return this.userRegistrationForm.get('email');
  }

  get password(): AbstractControl {
    return this.userRegistrationForm.get('abc.password');
  }

  get confirmPassword(): AbstractControl {
    return this.userRegistrationForm.get('abc.confirmPassword');
  }

  get roles(): AbstractControl {
    return this.userRegistrationForm.get('roles');
  }

  toSelectedRoles(value): void {
    // console.log(value);
    this.selectedRoles = value;
    if (this.selectedRoles.length !== 0) {
      if (this.selectedRoles.includes(0)) {
        this.nonCustomerRoleSelected = false;
        this.customerRoleSelected = true;
      } else {
        this.nonCustomerRoleSelected = true;
        this.customerRoleSelected = false;
      }
    } else {
      this.nonCustomerRoleSelected = false;
      this.customerRoleSelected = false;
    }
  }

  onSubmit(): void {
    const dialogRef1 = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Send OTP',
        message: 'We will send OTP to verify :' + this.email.value,
        name: ' ',
        button1: 'Cancel',
        button2: 'Send OTP'
      }
    });

    dialogRef1.afterClosed().subscribe(result1 => {
      // console.log(`Dialog result: ${result3}`);
      if (result1 === true) {
        this.http1.post<any>(`http://localhost:3000/authentication/sendOtpToEmail`, {userEnteredEmail: this.email.value})
          .subscribe(
            response1 => {
              console.log(response1.otpID);
              this.otpService.changeOtpIDSubjectNumberValue(response1.otpID);
              const dialogRef2 = this.dialog.open(OtpDialogBoxComponent, {
                data: {
                  title: 'Enter OTP: !',
                  message: 'We sent an one-time-password(OTP) to your email address. ',
                  name: ' ',
                  button1: 'Cancel',
                  button2: 'Register'
                }
              });

              dialogRef2.afterClosed().subscribe(result2 => {
                if (result2 === true) {
                  const registrationForm = this.userRegistrationForm.value;
                  registrationForm.firstName = this.capitalize(this.firstName.value);
                  registrationForm.lastName = this.capitalize(this.lastName.value);
                  registrationForm.profilePicture = this.profilePicture;

                  // user-data and otp send to back end
                  this.authenticationService.signup(registrationForm, this.otpService.otp, this.otpService.otpID)
                    .subscribe(
                      response2 => {
                        console.log('Success!(frontend)', response2);
                        const dialogRef3 = this.dialog.open(DialogBoxComponent, {
                          data: {
                            image: 'data:image/png;base64,' + response2.image,
                            title: 'Success!',
                            message: 'Register new user successfully ',
                            name: ' ',
                            button1: '',
                            button2: 'Ok'
                          }
                        });

                        dialogRef3.afterClosed().subscribe(result3 => {
                          console.log(`Dialog result: ${result3}`);
                          this.myForm.resetForm();
                          if (result3 === true) {

                          } else {
                          }
                        });
                      },
                      error2 => {
                        console.error('Error!(frontend)', error2);
                        const dialogRef3 = this.dialog.open(DialogBoxComponent, {
                          data: {
                            image: '',
                            title: 'Failed!',
                            message: error2,
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
                  console.log(`Dialog result: ${result2}`);

                }
              });
            }, error1 => {
              console.log(error1);
            }
          );

      } else {

      }
    });
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProfilePictureDialogComponent, {
      // width: '50%'
      data: {
        currentPicture: this.profilePicture
      }
    });

    dialogRef.afterClosed().subscribe(picture => {
      console.log(picture);
      this.profilePicture = picture;
    });

  }

  onCancel(): void {
    this.userRegistrationForm.reset();
  }

}

@Component({
  selector: 'app-profile-picture-dialog',
  templateUrl: './profile-picture-dialog.component.html',
  styleUrls: ['./signup.component.css']
})

export class ProfilePictureDialogComponent implements OnInit {
  currentPicture;

  constructor(
    public dialogRef: MatDialogRef<ProfilePictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentPicture = this.data.currentPicture;
  }

  ngOnInit(): void {
  }

  onCropped($event): void {
    this.dialogRef.close($event);
  }


}
