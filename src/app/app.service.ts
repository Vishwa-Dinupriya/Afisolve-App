import {Inject, Injectable, Renderer2} from '@angular/core';
import {Subject} from 'rxjs';
import {AppComponent} from './app.component';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isDarkTheme: boolean;
  isDarkThemeSubjectBoolean: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.isDarkThemeSubjectBoolean.subscribe(value => this.isDarkTheme = value);
  }

  changeIsDarkThemeSubjectBooleanValue(newValue: boolean): void {
    this.isDarkThemeSubjectBoolean.next(newValue);
  }
}
