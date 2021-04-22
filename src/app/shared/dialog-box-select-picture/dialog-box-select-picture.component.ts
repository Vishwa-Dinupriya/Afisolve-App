import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box-select-profile-picture',
  templateUrl: './dialog-box-select-picture.component.html',
  styleUrls: ['./dialog-box-select-picture.component.css']
})
export class DialogBoxSelectPictureComponent implements OnInit {

  currentPicture;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxSelectPictureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentPicture = this.data.currentPicture;
  }

  ngOnInit(): void {
  }

  onCropped($event): void {
    this.dialogRef.close($event);
  }

}
