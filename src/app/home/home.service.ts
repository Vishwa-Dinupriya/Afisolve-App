import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  name: string;
  roles: string; // child eken access karanne

  private nameChange: Subject<string> = new Subject<string>(); // instance deka separate nowee thiyganne meken
  private rolesChange: Subject<string> = new Subject<string>();


  constructor(private http: HttpClient) {
    this.nameChange.subscribe(value => this.name = value); // subscribe to observable
    this.rolesChange.subscribe(value => this.roles = value); // next eken enne methnata
  }

  changeName(name: string): void {
    this.nameChange.next(name); // next eka => backend eken response ekak enawa wage thamai
  }

  changeRoles(roles: string): void {
    this.rolesChange.next(roles);
  }

  // changePicture(name: string): void {
  //   this.nameChange.next(name);
  // }


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
