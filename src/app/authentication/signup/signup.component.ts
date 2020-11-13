import {Component, OnInit} from '@angular/core';
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

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmails(): void {
    this.alternateEmails.push(this.fb1.group({
      alternateEmail: ['', Validators.required],
      phone: ['']
    }));
  }

  constructor(private fb1: FormBuilder, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb1.group({
      userName: ['Vishwa', [Validators.required, Validators.minLength(3), forbiddenNameValidator1, forbiddenNameValidator2(/password/)]],
      email: ['a@b.com'],
      subscribe: [false],
      password: ['123', [Validators.required]],
      confirmPassword: ['123'],
      address: this.fb1.group({
        city: ['asd'],
        state: ['asd'],
        postalCode: ['asd'],
      }),
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


  // F i r s t___M e t h o d
  // "Form Model" is an instance of FormGroup
  // registrationForm = new FormGroup({
  //   userName: new FormControl('Vishwa'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl(''),
  //   })
  // });

  // S e c o n d__M e t h o d
  // registrationForm = this.fb1.group({
  //   userName: ['Vishwa', [Validators.required, Validators.minLength(3), forbiddenNameValidator1, forbiddenNameValidator2(/password/)]],
  //   email: [''],
  //   subscribe: [false],
  //   password: [''],
  //   confirmPassword: [''],
  //   address: this.fb1.group({
  //     city: [''],
  //     state: [''],
  //     postalCode: [''],
  //   })
  // }, {validator: PasswordValidator1}); // 'form builder'(fb) is a simpler alternative to create form groups and form controls

  loadApiData(): void {
    //   this.registrationForm.setValue({
    //     userName: 'Bruce',
    //     password: 'test',
    //     confirmPassword: 'test',
    //     address: {
    //       city: 'City',
    //       state: 'State',
    //       postalCode: '123456',
    //     }
    //   // when using 'setValue' then need to provide data for each & every form control
    // });

    this.registrationForm.patchValue({
      userName: 'Bruce',
      password: 'test',
      confirmPassword: 'test'
      // when using 'patchValue' then not need to provide data for each & every form control
    });
  }

  onSubmit(): void{
    console.log(this.registrationForm.value);
    this.authenticationService.register(this.registrationForm.value)
      .subscribe(
        response => console.log('Success!(frontend)', response),
        error => console.error('Error!(frontend)', error)
      );
  }

}
