


import {AfterViewInit, Component, HostBinding, HostListener, Inject, OnInit, Output, Renderer2} from '@angular/core';

import {AuthenticationService} from '../authentication/authentication.service';
import {DOCUMENT} from '@angular/common';

import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AdminService} from './admin/admin.service';
import {AppService} from '../app.service';
import {EventEmitter} from 'events';
import {HomeService} from './home.service';
import {MatMenu} from '@angular/material/menu';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isDarkTheme = false;
  toggleDrawerBtnValue: boolean;
  isBigScreen: boolean;
  profilePicture;


  @HostBinding('class')
  get themeMode(): 'myDarkTheme' | 'myLightTheme' {
    return this.isDarkTheme ? 'myDarkTheme' : 'myLightTheme';
  }

  selectedValue = 0;
  roles: string[] = ['Admin', 'Developer', 'Project Manager', 'test'];


  firstname;
  userEmail;
  roles;
  currentRole;

  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    this.isBigScreen = (window.innerWidth) > 700;
    this.homeService.ToggleDrawer(this.isBigScreen);
    this.toggleDrawerBtnValue = this.homeService.drawer;
  }


  constructor(
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2, // this line for theme
    public authenticationService: AuthenticationService,

    public userDetails: UserDataService,


    private router: Router,
    private http1: HttpClient,
    public appService: AppService,
    public homeService: HomeService

  ) {
  }

  ngOnInit(): void {

    this.userDetails.getUserDetails().subscribe(
      response => {
        this.userDetails.changeName(response.firstname);
        console.log(this.userDetails.name);

    this.homeService.changeUserProfileModeBooleanSubject(false);
    this.homeService.changeUserEmailStringSubjectValue(null);
    this.isBigScreen = (window.innerWidth) > 700; // using this line for toggle-button-> hide or not
    this.homeService.ToggleDrawer(this.isBigScreen);
    this.toggleDrawerBtnValue = this.homeService.drawer;

    this.http1.post<any>(`http://localhost:3000/home/user-toolbar-display-details`, {}).subscribe(
      response => {
        this.currentRole = response.selectedRole;
        this.firstname = response.firstname;
        this.roles = response.roles;
        this.profilePicture = 'data:image/png;base64,' + response.profilePhoto;

      },
      error => {
        console.log(error);
      }
    );
  }

  toggleDrawer(): void { // toggle button
    this.toggleDrawerBtnValue = !this.toggleDrawerBtnValue;
    this.homeService.ToggleDrawer(this.toggleDrawerBtnValue);
  }

  public changeTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.appService.changeIsDarkThemeSubjectBooleanValue(this.isDarkTheme);
  }


  test_function(i): void {
    console.log(i);
    this.selectedValue = i;

  roleChangeFunction(i): void {
    console.log(this.roles[i].roleName);
    this.authenticationService.roleChange(this.roles[i])
      .subscribe(
        response => {
          console.log('Role change Success!(frontend)', response);
          console.log(response.requestedRole);
          localStorage.setItem('token', response.token);
          this.router.navigate([`../home/${response.requestedRole.toLowerCase()}`]);
          this.currentRole = response.requestedRole;
        },
        error => {
          console.error('Role change Error!(frontend)', error);
        }
      );

  }

  goToUserProfile(): void {
    this.homeService.changeUserProfileModeBooleanSubject(true);
    this.homeService.changeUserEmailStringSubjectValue(localStorage.getItem('userEmail'));
  }

}
