import {AfterViewInit, Component, Inject, Input, OnChanges, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {checkPasswords} from 'src/app/authentication/shared/password.validator';
import {AuthenticationService} from 'src/app/authentication/authentication.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {UsersService} from '../../admin/users/users.service';
import {HomeService} from '../../home.service';

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

  hidePassword = true;
  hideConfirmPassword = true;
  edit = false;
  haveChanges = false;
  userRegistrationForm: FormGroup;
  tabIndex;
  oldEmail;

  userRegistrationFormCopy;

  roleList: string[] = ['Customer', 'Account-Coordinator', 'Developer', 'Project-Manager', 'CEO', 'Admin'];
  selectedRoles: number [] = [];

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb1: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private http1: HttpClient,
    public dialog: MatDialog,
    public usersService1: UsersService,
    public homeService: HomeService
  ) {
  }

  ngOnInit(): void {
    console.log('ngOn init');
    this.formBuildFunction();
  }

  ngOnChanges(): void {
    console.log(this.userEmailChild);
    // this.formBuildFunction();
    if (this.userRegistrationForm) {
      console.log('form is build');
      this.tabIndex = '1';
      this.formBuildFunction();
      this.getAndSetValues();
    }
  }

  formBuildFunction(): void {
    console.log('form build func');
    this.userRegistrationForm = this.fb1.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb1.group({
        password: ['', [Validators.required]],
        confirmPassword: ['']
      }, {validators: checkPasswords}),
      roles: [[''], [Validators.required]],
      defaultRole: ['', [Validators.required]],
      contactNumber: ['']
    });
  }

  createFormCopy(): void {
    this.userRegistrationFormCopy = Object.assign({}, this.userRegistrationForm.value);
    this.oldEmail = this.userRegistrationFormCopy.email;
    console.log('init form copy ');
    console.log(this.userRegistrationFormCopy);
    this.haveChanges = null;
    console.log('have changes ? ' + this.haveChanges);

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
          console.log('have changes? ' + this.haveChanges);
        } else {
          this.haveChanges = false;
          console.log('have changes? ' + this.haveChanges);
        }
        console.log('valid ? ' + this.userRegistrationForm.valid);
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
    // console.log('$event ' + value);
    // console.log('selectedRoles: ' + this.selectedRoles);
    // console.log('roles: ' + this.roles.value);
    // console.log('default role: ' + this.defaultRole.value);

    if (!this.selectedRoles.includes(this.defaultRole.value)) {
      this.defaultRole.reset();
      console.log('hasError ' + this.userRegistrationForm.hasError('required', 'defaultRole'));
      this.defaultRole.markAsTouched();
    }

  }

  onCancelEdit(): void {
    this.edit = !this.edit;
    this.userRegistrationForm.reset();
    this.userRegistrationForm.setValue(this.userRegistrationFormCopy);
    this.selectedRoles = this.roles.value;
  }

  public saveChangesDialog(): void {
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
        console.log(`Dialog result: ${result}`);
        this.onUpdate();
      } else {
        console.log(`Dialog result: ${result}`);
      }
    });
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
    const registrationForm = this.userRegistrationForm.value;
    registrationForm.firstName = this.capitalize(this.firstName.value);
    registrationForm.lastName = this.capitalize(this.lastName.value);
    this.authenticationService.updateProfile(this.userRegistrationForm.value, this.oldEmail)
      .subscribe(
        response => {
          console.log('Update Success!(frontend)', response);
          this.edit = false;
          this.getAndSetValues();
        },
        error => {
          console.error('Update Error!(frontend)', error);
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

}
