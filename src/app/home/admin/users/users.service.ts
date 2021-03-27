import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isUserProfileMode: boolean;
  userEmailParent: string;

  private isProfileModeSubjectBoolean: Subject<boolean> = new Subject<boolean>();
  private userEmailParentSubjectString: Subject<string> = new Subject<string>();

  constructor() {
    this.isProfileModeSubjectBoolean.subscribe(value => this.isUserProfileMode = value);
    this.userEmailParentSubjectString.subscribe(value => this.userEmailParent = value);
  }

  changeIsProfileModeSubjectBooleanValue(newIsProfileModeValue: boolean): void {
    this.isProfileModeSubjectBoolean.next(newIsProfileModeValue);
  }

  changeUserEmailParentSubjectStringValue(newUserEmailParentValue: string): void {
    this.userEmailParentSubjectString.next(newUserEmailParentValue);
  }

}
