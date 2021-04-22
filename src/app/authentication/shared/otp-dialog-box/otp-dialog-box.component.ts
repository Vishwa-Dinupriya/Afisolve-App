import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {OtpService} from '../../../home/shared/otp-service/otp.service';

@Component({
  selector: 'app-otp-dialog-box',
  templateUrl: './otp-dialog-box.component.html',
  styleUrls: ['./otp-dialog-box.component.css']
})
export class OtpDialogBoxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public otpService: OtpService) {
  }

  ngOnInit(): void {
  }

  sendOtpToServiceFile(value: string): void {
    this.otpService.changeOtpValueSubjectNumberValue(Number(value));
  }
}
