import {Component, HostBinding, Inject, OnInit, Renderer2} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {UserDataService} from './services/user-data.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isDarkTheme = false;

  @HostBinding('class')
  get themeMode(): 'myDarkTheme' | 'myLightTheme' {
    return this.isDarkTheme ? 'myDarkTheme' : 'myLightTheme';
  }

  selectedValue = 0;
  roles: string[] = ['Admin', 'Developer', 'Project Manager'];

  constructor(
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2,
    public authenticationService: AuthenticationService,
    public userDetails: UserDataService
  ) {
  }

  ngOnInit(): void {
    this.userDetails.getUserDetails().subscribe(
      response => {
        this.userDetails.changeName(response.firstname);
        console.log(this.userDetails.name);
      },
      error => {
        console.log(error);
      }
    );
  }

  changeTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    const hostClass = this.isDarkTheme ? 'myDarkTheme' : 'myLightTheme';
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
  }

  nextTheme(): string {
    if (this.isDarkTheme) {
      return 'light';
    }
    return 'dark';
  }

  test_function(i): void {
    console.log(i);
    this.selectedValue = i;
  }


}
