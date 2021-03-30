import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {checkPasswords} from '../shared/password.validator';
import {AuthenticationService} from '../authentication.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {DialogBoxComponent} from '../../home/shared/dialog-box/dialog-box.component';
import {MatDialog} from '@angular/material/dialog';
import {UsersService} from '../../home/admin/users/users.service';

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

  userRegistrationForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  roleList: string[] = ['Customer', 'Account Coordinator', 'Developer', 'Project Manager', 'CEO', 'Admin'];
  selectedRoles: number [] = [];

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb1: FormBuilder,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    public userService: UsersService) {
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
    console.log(value);
    this.selectedRoles = value;
  }

  onSubmit(): void {
    const registrationForm = this.userRegistrationForm.value;
    registrationForm.firstName = this.capitalize(this.firstName.value);
    registrationForm.lastName = this.capitalize(this.lastName.value);
    this.authenticationService.signup(this.userRegistrationForm.value)
      .subscribe(
        response => {
          console.log('Success!(frontend)', response);
          const dialogRef = this.dialog.open(DialogBoxComponent, {
            data: {
              title: 'Success!',
              message: 'Register new user successfully ',
              name: ' ',
              button1: 'Back to All users',
              button2: 'Ok'
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if (result === true) {
              this.ngOnInit();
            } else {
              this.ngOnInit();
              this.userService.ChangeCreateUserModeBooleanSubjectValue(false);
            }
          });
        },
        error => console.error('Error!(frontend)', error)
      );
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}

