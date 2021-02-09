import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  name: string;
  private nameChange: Subject<string> = new Subject<string>();

  // name: string;
  // private nameChange: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
    this.nameChange.subscribe(value => this.name = value); // subscribe to observable
  }

  changeName(name: string): void {
    this.nameChange.next(name);
  }

  // changePicture(name: string): void {
  //   this.nameChange.next(name);
  // }

  getUserDetails(): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/common/get-user-login-details`, {});
  }

  // getUserDetaissls(): Observable<any> {
  //   this.http.post('http://localhost:3000/users/get-profile-picture', {}).subscribe(
  //     response => {
  //       this.croppedImageBase64 = response.profilePicture;
  //     }, error => console.error(error)
  //   ).add(() => {
  //     this.savingData = false;
  //   });
  // }


}
