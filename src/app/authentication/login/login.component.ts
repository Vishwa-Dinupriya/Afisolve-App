import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators, FormArray, AbstractControl} from '@angular/forms';
import {forbiddenNameValidator1} from '../shared/user-name.validator';
import {forbiddenNameValidator2} from '../shared/user-name.validator';
import {PasswordValidator1} from '../shared/password.validator';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  get userName(): AbstractControl {
    return this.loginForm.get('userName');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  constructor(private fb1: FormBuilder, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb1.group({
      userName: ['Vishwa', [Validators.required, Validators.minLength(3), forbiddenNameValidator1, forbiddenNameValidator2(/password/)]],
      password: ['123', [Validators.required]]
    });
  }

  onLogin(): void {
    console.log(this.loginForm.value);
    this.authenticationService.login(this.loginForm.value)
      .subscribe(
        response => console.log('Success!(frontend)', response),
        error => console.error('Error!(frontend)', error)
      );
  }

}


