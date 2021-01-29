import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormArray, AbstractControl} from '@angular/forms';
import {PasswordValidator1} from '../shared/password.validator';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userRegistrationForm: FormGroup;

  roleList: string[] = ['Customer', 'Account Coordinator', 'Developer', 'Project Manager', 'CEO'];

  constructor(
    private fb1: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userRegistrationForm = this.fb1.group({
      firstName: ['', [Validators.required, Validators.minLength(6)]],
      lastName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['123', [Validators.required]],
      confirmPassword: ['123'],
      role: ['', [Validators.required]]
    }, {validators: PasswordValidator1});

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
    return this.userRegistrationForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.userRegistrationForm.get('confirmPassword');
  }

  onSubmit(): void {
    console.log(this.userRegistrationForm.value);
    this.authenticationService.signup(this.userRegistrationForm.value)
      .subscribe(
        response => {
          console.log('Success!(frontend)', response);
          localStorage.setItem('token', response.token);
          this.router.navigate([`../${response.role}`]);
        },
        error => console.error('Error!(frontend)', error)
      );
  }

}
