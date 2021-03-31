import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {forbiddenNameValidator1} from '../shared/user-name.validator';
import {forbiddenNameValidator2} from '../shared/user-name.validator';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public firstName: string;
  public userRoles;

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  constructor(private fb1: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb1.group({
      email: ['admin@gmail.com',
        [Validators.required,
          Validators.minLength(3),
          // forbiddenNameValidator1,
          forbiddenNameValidator2(/password/)
        ]
      ],
      password: ['123', [Validators.required]]
    });
  }

  onLogin(): void {
    console.log(this.loginForm.value);
    this.authenticationService.login(this.loginForm.value)
      .subscribe(
        response => {
          console.log('Login Success!(frontend)', response);
          console.log(response.role);
          localStorage.setItem('token', response.token);
          this.router.navigate([`../home/${response.role.toLowerCase()}`]);
        },
        error => {
          console.error('Login Error!(frontend)', error);
        }
      );
  }
}
