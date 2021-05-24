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
import {ForgetPasswordDialogBoxComponent} from '../authentication/login/forget-password-dialog-box/forget-password-dialog-box.component';
import {DialogBoxComponent} from '../shared/dialog-box/dialog-box.component';
import {MatDialog} from '@angular/material/dialog';
import {OtpService} from '../shared/otp-service/otp.service';
import {ChangePasswordService} from './shared/change-password-dialog-box/change-password.service';
import {ChangePasswordDialogBoxComponent} from './shared/change-password-dialog-box/change-password-dialog-box.component';


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

  firstname;
  userEmail;
  roles;
  currentRole;
  dataSourceNotifications: any;
  hidd: number;
  tim: any;
  selectedvalue: string[];

  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    this.isBigScreen = (window.innerWidth) > 800;
    this.homeService.ToggleDrawer(this.isBigScreen);
    this.toggleDrawerBtnValue = this.homeService.drawer;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2, // this line for theme
    public authenticationService: AuthenticationService,
    private router: Router,
    private http1: HttpClient,
    public appService: AppService,
    public homeService: HomeService,
    private dialog: MatDialog,
    private otpService: OtpService,
    private changePasswordService: ChangePasswordService
  ) {
    this.authenticationService.refreshNeededForSessionTomeOutSubject$.subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
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

    this.homeService.refreshNeededformsg$
      .subscribe(() => {
        this.getNotification();
      });
    this.getNotification();
  }

  toggleDrawer(): void { // toggle button
    this.toggleDrawerBtnValue = !this.toggleDrawerBtnValue;
    this.homeService.ToggleDrawer(this.toggleDrawerBtnValue);
  }

  public changeTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.appService.changeIsDarkThemeSubjectBooleanValue(this.isDarkTheme);
  }

  roleChangeFunction(i): void {
    // console.log(this.roles[i].roleName);
    this.homeService.changeUserProfileModeBooleanSubject(false);
    this.authenticationService.roleChange(this.roles[i])
      .subscribe(
        response => {
          console.log('Role change Success!(frontend)', response);
          // console.log(response.requestedRole);
          localStorage.setItem('token', response.token);

          this.router.navigate([`../home/${response.requestedRole.toLowerCase()}`]);
          this.currentRole = response.requestedRole;
          this.getNotification();
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

  getNotification(): void {
    // console.log(this.currentRole);
    this.http1.get<any>(`http://localhost:3000/home/get-reminder-notification`, {}).subscribe(
      response => {
        this.dataSourceNotifications = response.data;
        console.log(this.dataSourceNotifications);
        this.hidd = this.dataSourceNotifications.length;

      }, error => {
        console.log(error);
      }
    );
  }

  readAlert(selectedvalue: string[]): void {
    console.log(selectedvalue);
    this.tim = 'submittedtime:6789';
    console.log(this.tim);
    this.homeService.changeReadStatus(selectedvalue)
      .subscribe(
        response => {
          console.log('Success!(frontend)', response);
        },
        error => console.error('Error!(frontend)', error)
      );
  }

  changePassword(): void {
    const dialogRef1 = this.dialog.open(ChangePasswordDialogBoxComponent, {
      data: {
        title: 'Change Password!',
        message: 'We need to verify it\'s you ',
        descriptionLine1: 'Click next then we will send OTP(one-time-password) to your email',
        descriptionLine2: 'Then you can create new password.',
        button1: 'Cancel',
        button2: 'Done',
        userEmail: localStorage.getItem('userEmail')
      }
    });

    dialogRef1.afterClosed().subscribe(result1 => {
      if (result1 === true) {
        // new password and otp send to back end
        this.authenticationService.changePassword(
          this.changePasswordService.changePasswordEmail,
          this.changePasswordService.newPassword,
          this.otpService.otp,
          this.otpService.otpID)
          .subscribe(
            response => {
              console.log('Success!(frontend)', response);
              const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  image: ' ',
                  title: 'Success!',
                  message: 'Password Changed Successfully! Please login with new password ',
                  name: ' ',
                  button1: '',
                  button2: 'Ok'
                }
              });

              dialogRef2.afterClosed().subscribe(result2 => {
                console.log(`Dialog result: ${result2}`);
                if (result2 === true) {
                  this.authenticationService.logout();
                } else {
                  this.authenticationService.logout();
                }
              });
            },
            error => {
              console.error('Error!(frontend)', error);
              const dialogRef3 = this.dialog.open(DialogBoxComponent, {
                data: {
                  image: '',
                  title: 'Failed!',
                  message: error,
                  name: ' ',
                  button1: '',
                  button2: 'Retry'
                }
              });

              dialogRef3.afterClosed().subscribe(result3 => {
                console.log(`Dialog result: ${result3}`);
                if (result3 === true) {

                } else {

                }
              });
            }
          );
      } else {
        console.log(`Dialog result: ${result1}`);

      }
    });
  }

}
