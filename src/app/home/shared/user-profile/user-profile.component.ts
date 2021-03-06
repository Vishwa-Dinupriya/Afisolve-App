import {AfterViewInit, Component, Inject, Input, OnChanges, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {AuthenticationService} from 'src/app/authentication/authentication.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';
import {UsersService} from '../../admin/users/users.service';
import {HomeService} from '../../home.service';
import {DialogBoxSelectPictureComponent} from '../../../shared/dialog-box-select-picture/dialog-box-select-picture.component';
import {OtpService} from '../../../shared/otp-service/otp.service';
import {OtpDialogBoxComponent} from '../../../shared/otp-dialog-box/otp-dialog-box.component';

export interface IUserGeneral {
  lastLogin: string;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit, OnChanges {
  @Input() userEmailChild: string;

  USER_GENERAL_DATA: IUserGeneral;

  title;
  subtitle;
  edit = false;
  haveChanges = false;
  userRegistrationForm: FormGroup;
  tabIndex;
  oldEmail;

  userRegistrationFormCopy;

  roleList: string[] = ['Customer', 'Account-Coordinator', 'Developer', 'Project-Manager', 'CEO', 'Admin'];
  selectedRoles: number [] = [];

  currentProfilePicture;
  newProfilePicture;

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb1: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private http1: HttpClient,
    public dialog: MatDialog,
    public usersService1: UsersService,
    public homeService: HomeService,
    private authService: AuthenticationService,
    private otpService: OtpService
  ) {
  }

  ngOnInit(): void {
    this.formBuildFunction();
  }

  ngOnChanges(): void {
    if (this.userRegistrationForm) {
      this.tabIndex = '1';
      this.formBuildFunction();
      this.getAndSetValues();
    }
  }

  formBuildFunction(): void {
    this.userRegistrationForm = this.fb1.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      roles: [{value: '', disabled: true}, [Validators.required]],
      defaultRole: [{value: '', disabled: true}, [Validators.required]],
      contactNumber: ['']
    });
  }

  createFormCopy(): void {
    this.userRegistrationFormCopy = Object.assign({}, this.userRegistrationForm.value);
    this.oldEmail = this.userRegistrationFormCopy.email;
    this.userRegistrationFormCopy.roles = this.roles.value;
    this.userRegistrationFormCopy.defaultRole = this.defaultRole.value;
    this.title = this.userRegistrationFormCopy.firstName + ' ' + this.userRegistrationFormCopy.lastName;
    this.subtitle = this.userRegistrationFormCopy.email;
    this.haveChanges = null;

  }

  toggleDisabled(): void {
    if (this.edit) {
      // this.roles.disable();
      this.defaultRole.disable();
    } else {
      // this.roles.enable();
      this.defaultRole.enable();
    }
    this.edit = !this.edit;
  }

  subscribeToFormValChange(): void {

    if (this.userRegistrationFormCopy) {
      this.userRegistrationForm.valueChanges.subscribe(value => {
        if (this.userRegistrationFormCopy.firstName !== value.firstName ||
          this.userRegistrationFormCopy.lastName !== value.lastName ||
          this.userRegistrationFormCopy.email !== value.email ||
          JSON.stringify(this.userRegistrationFormCopy.roles) !== JSON.stringify(value.roles) ||
          this.userRegistrationFormCopy.defaultRole !== value.defaultRole ||
          this.userRegistrationFormCopy.contactNumber !== value.contactNumber) {
          this.haveChanges = true;
          // console.log('have changes? ' + this.haveChanges);
        } else {
          this.haveChanges = false;
          // console.log('have changes? ' + this.haveChanges);
        }
        // console.log('valid ? ' + this.userRegistrationForm.valid);
      });
    }
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

  get roles(): AbstractControl {
    return this.userRegistrationForm.get('roles');
  }

  get defaultRole(): AbstractControl {
    return this.userRegistrationForm.get('defaultRole');
  }

  get contactNumber(): AbstractControl {
    return this.userRegistrationForm.get('contactNumber');
  }

  toSelectedRoles(value): void {
    this.selectedRoles = value;
    // console.log('$event ' + value);
    // console.log('selectedRoles: ' + this.selectedRoles);
    // console.log('roles: ' + this.roles.value);
    // console.log('default role: ' + this.defaultRole.value);

    if (!this.selectedRoles.includes(this.defaultRole.value)) {
      this.defaultRole.reset();
      this.defaultRole.markAsTouched();
    }

  }

  onCancelEdit(): void {
    this.userRegistrationForm.reset();
    this.userRegistrationForm.setValue(this.userRegistrationFormCopy);
    this.selectedRoles = this.roles.value;
    this.toggleDisabled();
  }

  public saveChangesDialog(): void {
    const oldEmail = this.userRegistrationFormCopy.email;
    const updatedEmail = this.email.value;

    if (oldEmail !== updatedEmail) {
      // when admin update only 2 dialog boxes. but here 3 dialog boxes.because we have to inform about re-login
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        data: {
          title: 'Are you sure?',
          message: 'Save changes with ' + this.oldEmail + '? ' + 'Note: when you gonna update username , you have to re-login with new login credentials',
          name: '',
          button1: 'Cancel',
          button2: 'Continue'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          console.log(`Dialog result: ${result}`);
          this.http1.post<any>(`http://localhost:3000/authentication/sendOtpToEmail`, {userEnteredEmail: this.email.value})
            .subscribe(
              response => {
                // console.log(response.otpID);
                this.otpService.changeOtpIDSubjectNumberValue(response.otpID);
              }, error => {
                console.log(error);
              }
            );
          const dialogRef1 = this.dialog.open(OtpDialogBoxComponent, {
            data: {
              title: 'Enter OTP: !',
              message: 'We sent an one-time-password(OTP) to your new email address. ',
              name: ' ',
              button1: 'Cancel',
              button2: 'Submit'
            }
          });

          dialogRef1.afterClosed().subscribe(result1 => {
            if (result1 === true) {
              this.onUpdate();
            } else {
              console.log(`Dialog result: ${result1}`);
            }
          });
        } else {
          console.log(`Dialog result: ${result}`);
        }
      });

    } else {
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        data: {
          title: 'Are you sure?',
          message: 'Save changes with ' + this.oldEmail + '? ',
          name: '',
          button1: 'Cancel',
          button2: 'Continue'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          console.log(`Dialog result: ${result}`);
          this.onUpdate();
        } else {
          console.log(`Dialog result: ${result}`);
        }
      });
    }
  }

  getAndSetValues(): void {
    if (this.userEmailChild) {
      this.http1.post<any>(`http://localhost:3000/home/get-my-profile-details`, {UserEmail: this.userEmailChild})
        .subscribe(
          response => {
            this.firstName.setValue(response.firstname);
            this.lastName.setValue(response.lastname);
            this.email.setValue(response.userEmail);
            this.roles.setValue(response.roles.map(value => value.roleID));
            this.selectedRoles = response.roles.map(value => value.roleID);
            this.defaultRole.setValue(response.defaultRoleID);
            this.contactNumber.setValue(response.contactNumber);
            this.currentProfilePicture = 'data:image/png;base64,' + response.profilePhoto;

            this.createFormCopy();
            this.subscribeToFormValChange();

            this.USER_GENERAL_DATA = response.generalData[0];
            // this.dataSource = new MatTableDataSource<IUserGeneral>(this.USER_GENERAL_DATA);
          },
          error => {
            console.log(error);
          }
        );
    }

  }

  onUpdate(): void {
    console.log(this.userRegistrationFormCopy);
    const registrationForm = this.userRegistrationForm.value;
    registrationForm.firstName = this.capitalize(this.firstName.value);
    registrationForm.lastName = this.capitalize(this.lastName.value);
    this.http1.post<any>('http://localhost:3000/home/update-own-profile-details', {
      userNewData: this.userRegistrationForm.value,
      roles: this.userRegistrationFormCopy.roles,
      emailOld: this.oldEmail,
      newProfilePhoto_: this.newProfilePicture,
      clientOtp: this.otpService.otp,
      generatedOtpID: this.otpService.otpID

    }).subscribe(
      response => {
        console.log('Update Success!(frontend)', response);
        this.toggleDisabled();
        this.getAndSetValues();
        const dialogRef2 = this.dialog.open(DialogBoxComponent, {
          data: {
            image: '',
            title: 'Success!',
            message: 'Update Successfully! ',
            name: ' ',
            button1: '',
            button2: 'Ok'
          }
        });

        dialogRef2.afterClosed().subscribe(result2 => {
          console.log(`Dialog result: ${result2}`);
          if (result2 === true) {
            // this.usersService1.changeIsProfileModeSubjectBooleanValue(false);
            if (this.oldEmail !== this.email.value) {
              this.authService.logout();
            }
          } else {
            // this.usersService1.changeIsProfileModeSubjectBooleanValue(false);
            if (this.oldEmail !== this.email.value) {
              this.authService.logout();
            }
          }
        });
      },
      error => {
        console.error('Update Error!', error);
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
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  public backToAllUsers(): void {
    this.homeService.changeUserProfileModeBooleanSubject(false);
    this.homeService.changeUserEmailStringSubjectValue(null);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxSelectPictureComponent, {
      // width: '50%'
      data: {
        currentPicture: this.currentProfilePicture
      }

    });

    dialogRef.afterClosed().subscribe(picture => {
      this.newProfilePicture = picture;
      // console.log(this.newProfilePicture);
      if (this.newProfilePicture !== '' && this.newProfilePicture !== this.currentProfilePicture) {
        console.log('photos are different');
        this.haveChanges = true;
      }
    });


  }

}
