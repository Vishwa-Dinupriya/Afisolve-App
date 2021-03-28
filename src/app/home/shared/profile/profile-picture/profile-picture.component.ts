import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {

  @ViewChild('fileUpload') fileUploadClick: ElementRef;

  imageChangedEvent: any = '';
  croppedImageBase64: any = '';

  error = '';

  savingData = false;

  public constructor(private http: HttpClient) { }

  public ngOnInit(): void { }

  onFileSelected(): void {
    this.savingData = true;
    const formData = new FormData();
    this.http.post('http://localhost:3000/home/upload-profile-picture', {profilePicture: this.croppedImageBase64}).subscribe(
      response => {
        console.log(response);
      }, error => console.log(error)
    ).add(() => {
      this.savingData = false;
    });
  }

  clickFileUpload(): void {
    this.fileUploadClick.nativeElement.click();
  }

  fileChangeEvent(Event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImageBase64 = event.base64;
  }

}
