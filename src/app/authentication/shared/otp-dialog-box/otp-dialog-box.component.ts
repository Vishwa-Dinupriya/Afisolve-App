import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SignupService} from '../../signup/signup.service';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {convertValueToOutputAst} from '@angular/compiler/src/output/value_util';

@Component({
  selector: 'app-otp-dialog-box',
  templateUrl: './otp-dialog-box.component.html',
  styleUrls: ['./otp-dialog-box.component.css']
})
export class OtpDialogBoxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public signupService: SignupService) {
  }

  ngOnInit(): void {
  }

  sendOtpToServiceFile(value: string): void {
    this.signupService.changeOtpValueSubjectNumberValue(Number(value));
  }
}
