import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {checkPasswords} from 'src/app/authentication/shared/password.validator';
import {AuthenticationService} from 'src/app/authentication/authentication.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {HttpClient} from '@angular/common/http';

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

  registrationFormInitCopy;

  roleList: string[] = ['Customer', 'Account-Coordinator', 'Developer', 'Project-Manager', 'CEO', 'Admin'];

  matcher = new MyErrorStateMatcher();

  constructor(private fb1: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private http1: HttpClient
  ) {

  }

  ngOnInit(): void {
    this.formBuildFunction();
  }

  ngOnChanges(): void {
    if (this.userRegistrationForm) {
      this.formBuildFunction();

      this.http1.post<any>(`http://localhost:3000/admin//get-selected-user-profile-details`, {selectedUserEmail: this.userEmailChild})
        .subscribe(
          response => {
            console.log(response);
            this.firstName.setValue(response.firstname);
            this.lastName.setValue(response.lastname);
            this.email.setValue(response.userEmail);
            this.password.setValue(response.password);
            this.confirmPassword.setValue(response.password);
            this.roles.setValue(response.roles.map(value => value.roleName));
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
        contactNumber: [''],
      });
  }

  getCopyOfInitForm(): void {
    this.registrationFormInitCopy = Object.assign({}, this.userRegistrationForm.value);
    console.log('init form copy ');
    console.log(this.registrationFormInitCopy);
  }

  subscribeToFormValChange(): void {
    this.userRegistrationForm.valueChanges.subscribe(value => {

      if (this.registrationFormInitCopy.firstName !== value.firstName ||
        this.registrationFormInitCopy.lastName !== value.lastName ||
        this.registrationFormInitCopy.email !== value.email ||
        this.registrationFormInitCopy.password !== value.password ||
        JSON.stringify(this.registrationFormInitCopy.roles) !== JSON.stringify(value.roles) ||
        this.registrationFormInitCopy.contactNumber !== value.contactNumber) {
        this.haveChanges = true;
        // console.log('have changes');
        // console.log('init form copy ');
        // console.log(this.registrationFormInitCopy);
        // console.log('value from valchnge ');
        // console.log(value);
      } else {
        this.haveChanges = false;
        console.log('no have changes');
      }
    });
    // this.userRegistrationForm.reset();
    // this.userRegistrationForm.setValue(this.registrationFormCopy);
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

  get contactNumber(): AbstractControl {
    return this.userRegistrationForm.get('contactNumber');
  }

  onSubmit(): void {
    this.authenticationService.signup(this.userRegistrationForm.value)
      .subscribe(
        response => {
          console.log('Success!(frontend)', response);
        },
        error => console.error('Error!(frontend)', error)
      );
  }


}
