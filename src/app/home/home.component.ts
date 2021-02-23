import {AfterViewInit, Component, HostBinding, HostListener, Inject, OnInit, Renderer2} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {HomeService} from './home.service';
import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AdminService} from './admin/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isDarkTheme = false;
  toggleDrawerBtnValue: boolean;
  isBigScreen: boolean;

  selectedValue = 0;
  roles;

  // roles: string[] = ['Admin', 'Developer', 'Project Manager', 'test'];

  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    this.isBigScreen = (window.innerWidth) > 700;
    this.adminService.ToggleDrawer(this.isBigScreen);
    this.toggleDrawerBtnValue = this.adminService.drawer;
  }

  @HostBinding('class')
  get themeMode(): 'myDarkTheme' | 'myLightTheme' {
    return this.isDarkTheme ? 'myDarkTheme' : 'myLightTheme';
  }

  constructor(
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2, // this line for theme
    public authenticationService: AuthenticationService,
    public homeService: HomeService,
    public adminService: AdminService,
    private router: Router,
    private http1: HttpClient,
  ) {
  }

  ngOnInit(): void {

    this.isBigScreen = (window.innerWidth) > 700; // using this line toggle button-> hide or not
    this.adminService.ToggleDrawer(this.isBigScreen);
    this.toggleDrawerBtnValue = this.adminService.drawer;

    this.http1.post<any>(`http://localhost:3000/common/home/user-display-details`, {}).subscribe(
      response => {
        this.homeService.changeName(response.firstname);
        this.homeService.changeRoles(response.roles);
        this.roles = this.homeService.roles;
      },
      error => {
        console.log(error);
      }
    );
  }

  toggleDrawer(): void { // toggle button
    this.toggleDrawerBtnValue = !this.toggleDrawerBtnValue;
    this.adminService.ToggleDrawer(this.toggleDrawerBtnValue);
  }

  changeTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    const hostClass = this.isDarkTheme ? 'myDarkTheme' : 'myLightTheme';
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
  }

  nextTheme(): string { // mat tool-tip
    if (this.isDarkTheme) {
      return 'light';
    }
    return 'dark';
  }

  roleChangeFunction(i): void {
    this.selectedValue = i;
    console.log(this.roles[i].roleName);
    this.authenticationService.roleChange(this.roles[i])
      .subscribe(
        response => {
          console.log('Role change Success!(frontend)', response);
          console.log(response.role);
          localStorage.setItem('token', response.token);
          this.router.navigate([`../home/${response.role.toLowerCase()}`]);
        },
        error => {
          console.error('Role change Error!(frontend)', error);
        }
      );
  }


}
