import {AfterViewInit, Component, Inject, Input, OnChanges, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {checkPasswords} from 'src/app/authentication/shared/password.validator';
import {AuthenticationService} from 'src/app/authentication/authentication.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {UsersService} from '../users.service';
import {IUserGeneral} from '../../../shared/user-profile/user-profile.component';
import {DialogBoxComponent} from '../../../../shared/dialog-box/dialog-box.component';
import {DialogBoxSelectPictureComponent} from '../../../../shared/dialog-box-select-picture/dialog-box-select-picture.component';
import {OtpDialogBoxComponent} from '../../../../shared/otp-dialog-box/otp-dialog-box.component';
import {OtpService} from '../../../../shared/otp-service/otp.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-user-profile-for-admin-purpose',
  templateUrl: './user-profile-for-admin-purpose.component.html',
  styleUrls: ['./user-profile-for-admin-purpose.component.css']
})
export class UserProfileForAdminPurposeComponent implements OnChanges {

  @Input() userEmailChild: string;

  USER_GENERAL_DATA: IUserGeneral;

  hidePassword = true;
  hideConfirmPassword = true;
  edit = false;
  haveChanges = false;
  userRegistrationForm: FormGroup;
  tabIndex;
  oldEmail;
  name;
  userRegistrationFormCopy;

  roleList: string[] = ['Customer', 'Account-Coordinator', 'Developer', 'Project-Manager', 'CEO', 'Admin'];
  selectedRoles: number [] = [];

  customerRoleSelected;
  nonCustomerRoleSelected;

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
    private otpService: OtpService
  ) {
  }

  ngOnChanges(): void {
    // console.log('ngOnChanges');
    this.tabIndex = '1';
    this.formBuildFunction();
    this.getAndSetValues();
  }

  formBuildFunction(): void {
    this.userRegistrationForm = this.fb1.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb1.group({
        password: ['', [Validators.required]],
        confirmPassword: ['']
      }, {validators: checkPasswords}),
      roles: [{value: '', disabled: true}, [Validators.required]], // this assigned value is only valid for in initiate form
      defaultRole: [{value: '', disabled: true}, [Validators.required]],
      contactNumber: ['']
    });
  }

  createFormCopy(): void {
    this.userRegistrationFormCopy = Object.assign({}, this.userRegistrationForm.value);
    this.userRegistrationFormCopy.roles = this.roles.value;
    this.userRegistrationFormCopy.defaultRole = this.defaultRole.value;
    this.oldEmail = this.userRegistrationFormCopy.email;
    // console.log('init form copy ');
    // console.log(this.userRegistrationFormCopy);
    this.haveChanges = null;
    // console.log('have changes ? ' + this.haveChanges);

  }

  toggleDisabled(): void {
    if (this.edit) {
      this.roles.disable();
      this.defaultRole.disable();
    } else {
      this.roles.enable();
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
          this.userRegistrationFormCopy.passwordGroup.password !== value.passwordGroup.password ||
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

  get password(): AbstractControl {
    return this.userRegistrationForm.get('passwordGroup.password');
  }

  get confirmPassword(): AbstractControl {
    return this.userRegistrationForm.get('passwordGroup.confirmPassword');
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

    if (!this.selectedRoles.includes(this.defaultRole.value)) {
      this.defaultRole.reset();
      // console.log('hasError ' + this.userRegistrationForm.hasError('required', 'defaultRole'));
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
    if (this.userRegistrationFormCopy.email !== this.email.value) {
      this.http1.post<any>(`http://localhost:3000/authentication/sendOtpToEmail`, {userEnteredEmail: this.email.value})
        .subscribe(
          response => {
            console.log(response.otpID);
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
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        data: {
          title: 'Are you sure?',
          message: 'Save changes with ' + this.oldEmail + '? ',
          name: '',
          button1: 'Cancel',
          button2: 'Save'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          // console.log(`Dialog result: ${result}`);
          this.onUpdate();
        } else {
          // console.log(`Dialog result: ${result}`);
        }
      });
    }
  }

  getAndSetValues(): void {
    if (this.userEmailChild) {
      this.http1.post<any>(`http://localhost:3000/admin//get-selected-user-profile-details`, {selectedUserEmail: this.userEmailChild})
        .subscribe(
          response => {
            this.firstName.setValue(response.firstname);
            this.lastName.setValue(response.lastname);
            this.email.setValue(response.userEmail);
            this.password.setValue(response.password);
            this.confirmPassword.setValue(response.password);
            this.roles.setValue(response.roles.map(value => value.roleID));
            this.selectedRoles = response.roles.map(value => value.roleID);
            this.defaultRole.setValue(response.defaultRoleID);
            this.contactNumber.setValue(response.contactNumber);
            this.currentProfilePicture = 'data:image/png;base64,' + response.profilePhoto;

            this.name = response.firstname + ' ' + response.lastname;

            this.createFormCopy();
            this.subscribeToFormValChange();

            this.USER_GENERAL_DATA = response.generalData[0];

            if (this.roles.value.includes(0)) {
              this.nonCustomerRoleSelected = false;
              this.customerRoleSelected = true;
            } else {
              this.nonCustomerRoleSelected = true;
              this.customerRoleSelected = false;
            }
          },
          error => {
            console.log(error);
          }
        );
    }

  }

  onUpdate(): void {
    const registrationForm = this.userRegistrationForm.value;
    registrationForm.firstName = this.capitalize(this.firstName.value);
    registrationForm.lastName = this.capitalize(this.lastName.value);
    this.http1.post<any>('http://localhost:3000/admin/update-selected-user-profile-details', {
      userNewData: this.userRegistrationForm.value,
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
            button1: 'Back to All users',
            button2: 'Ok'
          }
        });

        dialogRef2.afterClosed().subscribe(result2 => {
          console.log(`Dialog result: ${result2}`);
          if (result2 === true) {

          } else {
            this.usersService1.changeIsProfileModeSubjectBooleanValue(false);
          }
        });
      },
      error => {
        console.error('Update Error!(frontend)', error);
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
    this.usersService1.changeIsProfileModeSubjectBooleanValue(false);
    this.usersService1.changeUserEmailParentSubjectStringValue(null);
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
      console.log(this.newProfilePicture);
      if (this.newProfilePicture !== '' && this.newProfilePicture !== this.currentProfilePicture) {
        console.log('photos are different');
        this.haveChanges = true;
      }
    });


  }

}
