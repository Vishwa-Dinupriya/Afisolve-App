import {AfterViewInit, Component, HostBinding, Inject, OnInit, Renderer2} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {UserDataService} from './services/user-data.service';
import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

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
  // roles: string[] = ['Admin', 'Developer', 'Project Manager', 'test'];
  roles;

  constructor(
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2, // this line for theme
    public authenticationService: AuthenticationService,
    public userDetails: UserDataService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    // this.http1.post<any>(`http://localhost:3000/common/get-user-login-details`, {}).subscribe(
    this.userDetails.getUserDetails().subscribe(
      response => {
        this.userDetails.changeName(response.firstname);
        this.userDetails.changeRoles(response.roles);
        this.roles = this.userDetails.roles;
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
