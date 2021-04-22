import {Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, Input} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './crop-and-upload-picture.component.html',
  styleUrls: ['./crop-and-upload-picture.component.css']
})
export class CropAndUploadPictureComponent implements OnInit {

  @Input() currentPicture;
  @ViewChild('fileUpload') fileUploadClick: ElementRef;
  @Output() newPicture = new EventEmitter<string>();

  imageChangedEvent: any = '';
  croppedImageBase64: any = '';

  error = '';

  savingData = false;
  test;

  public constructor(private http: HttpClient) {
  }

  public ngOnInit(): void {
  }

  onFileSelected(): void { // when click 'Done'
    this.newPicture.emit(this.croppedImageBase64);
  }

  clickFileUpload(): void {
    this.fileUploadClick.nativeElement.click();
  }

  fileChangeEvent(event: any): void { // after select a file from file system
    console.log('fileChangeEvent ');
    this.imageChangedEvent = event;
    this.test = true;
    console.log('test: ' + this.test);
  }

  imageCropped(event: ImageCroppedEvent): void {  // when get th hand away from cropper cropper return a ImageCroppedEvent to this
    this.croppedImageBase64 = event.base64;
  }

  inputBTNClicked(): void {
    console.log('BTN clicked');
    this.test = false;
    console.log('test: ' + this.test);
  }

}
