import {Component, Inject, Input, OnChanges, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {checkPasswords} from 'src/app/authentication/shared/password.validator';
import {AuthenticationService} from 'src/app/authentication/authentication.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../shared/dialog-box/dialog-box.component';

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
  hidePassword = true;
  hideConfirmPassword = true;
  edit = false;
  haveChanges = false;
  userRegistrationForm: FormGroup;
  tabIndex;
  oldEmail;

  registrationFormInitCopy;

  roleList: string[] = ['Customer', 'Account-Coordinator', 'Developer', 'Project-Manager', 'CEO', 'Admin'];
  selectedRoles: number [] = [];

  matcher = new MyErrorStateMatcher();

  constructor(
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2, // this line for theme
    private fb1: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private http1: HttpClient,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.formBuildFunction();
  }

  ngOnChanges(): void {
    if (this.userRegistrationForm) {
      this.tabIndex = '1';
      this.formBuildFunction();
      this.registrationFormInitCopy = null;

      this.http1.post<any>(`http://localhost:3000/admin//get-selected-user-profile-details`, {selectedUserEmail: this.userEmailChild})
        .subscribe(
          response => {
            console.log('response ');
            console.log(response);
            this.firstName.setValue(response.firstname);
            this.lastName.setValue(response.lastname);
            this.email.setValue(response.userEmail);
            this.password.setValue(response.password);
            this.confirmPassword.setValue(response.password);
            this.roles.setValue(response.roles.map(value => value.roleID));
            this.selectedRoles = response.roles.map(value => value.roleID);
            this.defaultRole.setValue(response.defaultRoleID);
            this.contactNumber.setValue(response.contactNumber);

            this.getCopyOfInitForm();
            this.subscribeToFormValChange();
          },
          error => {
            console.log(error);
          }
        );
    }
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
      roles: [[''], [Validators.required]],
      defaultRole: ['', [Validators.required]],
      contactNumber: ['']
    });
    console.log('im built');
  }

  getCopyOfInitForm(): void {
    this.registrationFormInitCopy = Object.assign({}, this.userRegistrationForm.value);
    this.oldEmail = this.registrationFormInitCopy.email;
    console.log('init form copy ');
    console.log(this.registrationFormInitCopy);
    console.log('have changes ? ' + this.haveChanges);

  }

  subscribeToFormValChange(): void {
    if (this.registrationFormInitCopy){
      this.userRegistrationForm.valueChanges.subscribe(value => {
        if (this.registrationFormInitCopy.firstName !== value.firstName ||
          this.registrationFormInitCopy.lastName !== value.lastName ||
          this.registrationFormInitCopy.email !== value.email ||
          this.registrationFormInitCopy.password !== value.password ||
          JSON.stringify(this.registrationFormInitCopy.roles) !== JSON.stringify(value.roles) ||
          this.registrationFormInitCopy.defaultRole !== value.defaultRole ||
          this.registrationFormInitCopy.contactNumber !== value.contactNumber) {
          this.haveChanges = true;
          console.log('have changes');
          console.log('Init ' + JSON.stringify(this.registrationFormInitCopy.contactNumber));
          console.log('regForm ' + JSON.stringify(value.contactNumber));
        } else {
          this.haveChanges = false;
          console.log('no have changes');
        }
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
    this.defaultRole.reset();
  }

  whenCancelEdit(): void {
    this.edit = !this.edit;
    this.userRegistrationForm.reset();
    this.userRegistrationForm.setValue(this.registrationFormInitCopy);
  }

  public saveChangesDialog(): void {

    const dialogRef = this.dialog.open(DialogBoxComponent, {data: {message: 'Save changes? ', name: '', button: 'Save'}});

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(`Dialog result: ${result}`);
        this.onUpdate();
      } else {
        console.log(`Dialog result: ${result}`);
      }
    });
  }

  onUpdate(): void {
    const registrationForm = this.userRegistrationForm.value;
    registrationForm.firstName = this.capitalize(this.firstName.value);
    registrationForm.lastName = this.capitalize(this.lastName.value);
    this.authenticationService.updateProfile(this.userRegistrationForm.value, this.oldEmail)
      .subscribe(
        response => {
          console.log('Update Success!(frontend)', response);
          this.ngOnChanges();
          console.log('have changes ? ' + this.haveChanges);
          this.edit = false;
        },
        error => {
          console.error('Update Error!(frontend)', error);
        }
      );
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }


}
