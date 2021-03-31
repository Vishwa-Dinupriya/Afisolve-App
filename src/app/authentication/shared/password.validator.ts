import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export function checkPasswords(group: FormGroup): { notSame: boolean } { // here we have the 'passwords' group
  const password = group.controls.password.value;
  const confirmPassword = group.controls.confirmPassword.value;

  return password === confirmPassword ? null : {notSame: true};
}





