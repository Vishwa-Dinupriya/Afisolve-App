import {Component} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import {UserProfileComponent} from '../../shared/user-profile/user-profile.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-test-sorting',
  templateUrl: './test-sorting.component.html',
  styleUrls: ['./test-sorting.component.css']
})
export class TestSortingComponent {

  myForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nested: this.formBuilder.group({
        password: ['', [Validators.required]],
        confirmPassword: ['']
      }, {validator: this.checkPasswords}),
    });

  }

  checkPasswords(group: FormGroup): { notSame: boolean } { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }
  get email(): AbstractControl {
    return this.myForm.get('email');
  }

  openDialog(): void{
    this.dialog.open(UserProfileComponent);
  }

}


