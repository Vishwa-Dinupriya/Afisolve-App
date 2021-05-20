import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-session-time-out-dialog-box',
  templateUrl: './session-time-out-dialog-box.component.html',
  styleUrls: ['./session-time-out-dialog-box.component.css']
})
export class SessionTimeOutDialogBoxComponent implements OnInit {

  reActivateSessionForm: FormGroup;
  hidePassword = true;
  userEmail = localStorage.getItem('userEmail');

  constructor(
    public dialogRef: MatDialogRef<SessionTimeOutDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb1: FormBuilder) {
  }

  ngOnInit(): void {
    this.reActivateSessionForm = this.fb1.group({
      password: ['', [Validators.required]]
    });
  }

  get username(): AbstractControl {
    return this.reActivateSessionForm.get('username');
  }

  get password(): AbstractControl {
    return this.reActivateSessionForm.get('password');
  }

  reActivateSession(): void {
    this.dialogRef.close({
      status: true,
      username: localStorage.getItem('userEmail'),
      password: this.password.value
    });
  }

  onLogout(): void {

  }
}
