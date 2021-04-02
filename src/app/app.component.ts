import {Component, HostBinding, Inject, OnInit, Renderer2} from '@angular/core';
import {AppService} from './app.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-afisolve';

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, // this line for theme
              private appService: AppService) {
    this.appService.isDarkThemeSubjectBoolean.subscribe(value => this.changeTheme());
  }

  ngOnInit(): void {
    // this.renderer.setAttribute(this.document.body, 'class', 'theme-light');
  }

  @HostBinding('class')
  get themeMode(): 'myDarkTheme' | 'myLightTheme' {
    return this.appService.isDarkTheme ? 'myDarkTheme' : 'myLightTheme';
  }

  public changeTheme(): void {
    const hostClass = this.appService.isDarkTheme ? 'myDarkTheme' : 'myLightTheme';
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
  }

}
