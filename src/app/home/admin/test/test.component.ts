import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  displayedColumns = ['userEmail', 'password', 'firstName', 'details', 'update', 'delete'];
  dataSourceUsers;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  loadedImage: any = '';

  constructor(private router: Router,
              private http1: HttpClient) {
  }

  ngOnInit(): void {
    console.log('from OnInit test');
    this.http1.post<any>(`http://localhost:3000/admin/get-users-details`, {}).subscribe(
      response => {
        this.dataSourceUsers = response.data;
        console.log(this.dataSourceUsers);
      }, error => {
        console.log(error);
      }
    );

  }

  public redirectToDetails(id: string): void {
    console.log(id);
  }

  public redirectToUpdate(id: string): void {
    console.log(id);
  }

  public redirectToDelete(id: string): void {
    console.log(id);
  }

  fileChangeEvent(event: any): void {
    console.log(this.imageChangedEvent);
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    console.log('imageCropped');
  }

  imageLoaded(image: HTMLImageElement): void {
    // show cropper
    console.log('imageLoaded');
  }

  cropperReady(): void {
    // cropper ready
    console.log('cropperReady');
  }

  loadImageFailed(): void {
    // show message
    console.log('loadImageFailed');
  }

  inputBTNClicked(): void {
    console.log('btn clicked');
    this.imageChangedEvent = null;
  }
}
