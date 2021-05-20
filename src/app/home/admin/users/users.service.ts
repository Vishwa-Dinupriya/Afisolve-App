import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isUserProfileMode: boolean;
  userEmailParent: string;
  // createUserMode: boolean;

  private isProfileModeSubjectBoolean: Subject<boolean> = new Subject<boolean>();
  private userEmailParentSubjectString: Subject<string> = new Subject<string>();
  // createUserModeBooleanSubject: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.isProfileModeSubjectBoolean.subscribe(value => this.isUserProfileMode = value);
    this.userEmailParentSubjectString.subscribe(value => this.userEmailParent = value);
    // this.createUserModeBooleanSubject.subscribe(value => this.createUserMode = value);
  }

  changeIsProfileModeSubjectBooleanValue(newIsProfileModeValue: boolean): void {
    this.isProfileModeSubjectBoolean.next(newIsProfileModeValue);
  }

  changeUserEmailParentSubjectStringValue(newUserEmailParentValue: string): void {
    this.userEmailParentSubjectString.next(newUserEmailParentValue);
  }

  // ChangeCreateUserModeBooleanSubjectValue(newCreateUserModeValue: boolean): void {
  //   this.createUserModeBooleanSubject.next(newCreateUserModeValue);
  // }

}
