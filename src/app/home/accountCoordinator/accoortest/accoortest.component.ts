import {Component, Inject, Input, OnChanges, OnInit, Renderer2} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogBoxComponent} from '../../shared/dialog-box/dialog-box.component';
import {DOCUMENT} from '@angular/common';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {checkPasswords} from '../../../authentication/shared/password.validator';

@Component({
  selector: 'app-accoortest',
  templateUrl: './accoortest.component.html',
  styleUrls: ['./accoortest.component.css']
})
export class AccoortestComponent implements OnInit{
  @Input() userEmailChild: string;
  hidePassword = true;
  hideConfirmPassword = true;
  edit = false;
  haveChanges = false;
  oldEmail;
  tabIndex;
  CreateTaskForm: FormGroup;
  CreateTaskFormInitCopy;


  StatusList: string[] = ['Pending', 'InProgress', 'Completed'];
  selectedStatus: number [] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2, // this line for theme
    private fb1: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private http1: HttpClient,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
   // this.formBuildFunction();
  }

 /* ngOnChanges(): void {
    if (this.userRegistrationForm) {
      this.tabIndex = '1';
      this.formBuildFunction();
      this.registrationFormInitCopy = null;

      this.http1.post<any>(`http://localhost:3000/admin//get-selected-user-profile-details`, {selectedUserEmail: this.userEmailChild})
        .subscribe(
          response => {
            console.log('response ');
            console.log(response);
            this.firstName.setValue(response.firstname);
            this.lastName.setValue(response.lastname);
            this.email.setValue(response.userEmail);
            this.password.setValue(response.password);
            this.confirmPassword.setValue(response.password);
            this.roles.setValue(response.roles.map(value => value.roleID));
            this.selectedRoles = response.roles.map(value => value.roleID);
            this.defaultRole.setValue(response.defaultRoleID);
            this.contactNumber.setValue(response.contactNumber);

            this.getCopyOfInitForm();
            this.subscribeToFormValChange();
          },
          error => {
            console.log(error);
          }
        );
    }
  }
  formBuildFunction(): void {
    this.userRegistrationForm = this.fb1.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb1.group({
        password: ['', [Validators.required]],
        confirmPassword: ['']
      }, {validators: checkPasswords}),
      roles: [[''], [Validators.required]],
      defaultRole: ['', [Validators.required]],
      contactNumber: ['']
    });
    console.log('im built');
  }


  get TaskID(): AbstractControl {
    return this.CreateTaskForm.get('firstName');
  }

  get ComplaintID(): AbstractControl {
    return this.CreateTaskForm.get('lastName');
  }

  get SubComplaintID: AbstractControl {
    return this.CreateTaskForm.get('email');
  }

  get TaskDescription: AbstractControl {
    return this.CreateTaskForm.get('passwordGroup.password');
  }

  get AssignedDate: AbstractControl {
    return this.CreateTaskForm.get('passwordGroup.confirmPassword');
  }

  get Deadline: AbstractControl {
    return this.CreateTaskForm.get('roles');
  }

  get roles: AbstractControl {
    return this.CreateTaskForm.get('defaultRole');
  }

  get contactNumber(): AbstractControl {
    return this.CreateTaskForm.get('contactNumber');
  }

  get email(): AbstractControl {
    return this.CreateTaskForm.get('email');
  }

  toSelectedStatus(value): void {
    this.selectedStatus = value;
    // this.defaultRole.reset();
  }

  whenCancelEdit(): void {
    this.edit = !this.edit;
    this.CreateTaskForm.reset();
    this.CreateTaskForm.setValue(this.CreateTaskFormInitCopy);
  }

  public saveChangesDialog(): void {

    const dialogRef = this.dialog.open(DialogBoxComponent, {data: {message: 'Save changes? ', name: '', button: 'Save'}});

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(`Dialog result: ${result}`);
        this.onUpdate();
      } else {
        console.log(`Dialog result: ${result}`);
      }
    });
  }

  onUpdate(): void {
  }
}

  */
}
