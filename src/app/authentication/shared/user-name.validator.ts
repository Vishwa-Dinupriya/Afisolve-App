import {AbstractControl, ValidatorFn} from '@angular/forms';

// create a validator function
export function forbiddenNameValidator1(control: AbstractControl): { [key: string]: any } | null {
  const forbidden = /admin/.test(control.value);
  return forbidden ? {forbiddenName: {value: control.value}} : null;
}

//
// drawback of the validator function is that it can accept only one parameter which is
// the 'form control'. so we cannot simply passing second parameter. instead what we
// have to do is create a factory  function that accept a string as a parameter and returns
// the validator function itself.

export function forbiddenNameValidator2(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenName.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
