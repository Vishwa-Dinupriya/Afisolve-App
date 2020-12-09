import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormBuilder, Validators, FormArray, AbstractControl} from '@angular/forms';
import {forbiddenNameValidator1} from '../shared/user-name.validator';
import {forbiddenNameValidator2} from '../shared/user-name.validator';
import {PasswordValidator1} from '../shared/password.validator';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registrationForm: FormGroup;

  get userName(): AbstractControl {
    return this.registrationForm.get('userName');
  }

  get email(): AbstractControl {
    return this.registrationForm.get('email');
  }

  get alternateEmails(): FormArray {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmails(): void {
    this.alternateEmails.push(this.fb1.group({
      alternateEmail: ['', Validators.required],
      phone: ['']
    }));
  }

  constructor(private fb1: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb1.group({
      userName: ['Vishwa', [Validators.required, Validators.minLength(3), forbiddenNameValidator1, forbiddenNameValidator2(/password/)]],
      email: ['a@b.com'],
      subscribe: [false],
      password: ['123', [Validators.required]],
      confirmPassword: ['123'],
      role: ['', [Validators.required]],
      alternateEmails: this.fb1.array([])
    }, {validator: PasswordValidator1}); // 'form builder'(fb) is a simpler alternative to create form groups and form controls


    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }

  loadApiData(): void {
    this.registrationForm.patchValue({
      userName: 'Bruce',
      password: 'test',
      confirmPassword: 'test'
      // when using 'patchValue' then not need to provide data for each & every form control
    });
  }

  onSubmit(): void {
    console.log(this.registrationForm.value);
    this.authenticationService.register(this.registrationForm.value)
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
