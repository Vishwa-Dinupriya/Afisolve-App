import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {checkPasswords} from '../shared/password.validator';
import {AuthenticationService} from '../authentication.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {DialogBoxComponent} from '../../home/shared/dialog-box/dialog-box.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
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
  @ViewChild('myForm') myForm;

  userRegistrationForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  profilePicture: string;

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
    const dialogRef1 = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Confirm!',
        message: 'Are you sure to add this new user? ',
        name: ' ',
        button1: 'Cancel',
        button2: 'Done'
      }
    });

    dialogRef1.afterClosed().subscribe(result1 => {
      console.log(`Dialog result: ${result1}`);
      if (result1 === true) {
        const registrationForm = this.userRegistrationForm.value;
        registrationForm.firstName = this.capitalize(this.firstName.value);
        registrationForm.lastName = this.capitalize(this.lastName.value);
        registrationForm.profilePicture = this.profilePicture;

        this.authenticationService.signup(registrationForm)
          .subscribe(
            response => {
              console.log('Success!(frontend)', response);
              const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  image: 'data:image/png;base64,' + response.image,
                  title: 'Success!',
                  message: 'Register new user successfully ',
                  name: ' ',
                  button1: 'Back to All users',
                  button2: 'Ok'
                }
              });

              dialogRef2.afterClosed().subscribe(result2 => {
                console.log(`Dialog result: ${result2}`);
                this.myForm.resetForm();
                if (result2 === true) {

                } else {
                  this.userService.ChangeCreateUserModeBooleanSubjectValue(false);
                }
              });
            },
            error => console.error('Error!(frontend)', error)
          );
      } else {
        console.log(`Dialog result: ${result1}`);

      }
    });
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProfilePictureDialogComponent, {
      // width: '50%'
      data: {
        currentPicture: this.profilePicture
      }
    });

    dialogRef.afterClosed().subscribe(picture => {
      console.log(picture);
      this.profilePicture = picture;
    });

  }

}

@Component({
  selector: 'app-profile-picture-dialog',
  templateUrl: './profile-picture-dialog.component.html',
  styleUrls: ['./signup.component.css']
})

export class ProfilePictureDialogComponent implements OnInit {
  currentPicture;
  constructor(
    public dialogRef: MatDialogRef<ProfilePictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentPicture = this.data.currentPicture;
  }

  ngOnInit(): void {
  }

  onCropped($event): void {
    this.dialogRef.close($event);
  }


}

