import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DialogBoxComponent} from '../shared/dialog-box/dialog-box.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SessionTimeOutDialogBoxComponent} from './shared/session-time-out-dialog-box/session-time-out-dialog-box.component';
import {AuthenticationService} from './authentication.service';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

  dialogRef: MatDialogRef<SessionTimeOutDialogBoxComponent>;
  dialogRef2: MatDialogRef<DialogBoxComponent>;

  constructor(private router: Router,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 0) {
        return throwError('Network connection failure (from error interceptor)');
      } else if (err.status === 408) {
        if (!this.dialogRef) {
          this.dialogRef = this.dialog.open(SessionTimeOutDialogBoxComponent, {
            disableClose: true,
            data: {
              title: 'Oops!',
              message: 'Session timeout! Please Re-Login with your password to re-activate your session.'
            }
          });
        }

        this.dialogRef.afterClosed().subscribe(result2 => {
          if (result2.status) {
            this.authenticationService.login({email: result2.username, password: result2.password}).subscribe(
              response => {
                console.log('Login Success!(frontend)', response);
                localStorage.setItem('userID', response.userID);
                localStorage.setItem('userEmail', response.userEmail);
                localStorage.setItem('token', response.token);
                this.authenticationService.changeRefreshNeededForSessionTomeOutSubject$();
              }, error1 => {
                console.log(error1);
              }).add(() => this.dialogRef = null);
          } else {
            this.dialogRef = null;
            this.authenticationService.logout();
            return throwError(err.error.message);
          }
        });

      }
      else if (err.status === 401) {
        console.log(err);
        if (!this.dialogRef2) {
          this.dialogRef2 = this.dialog.open(DialogBoxComponent, {
            disableClose: true,
            data: {
              title: 'Failed!',
              message: err.error.message,
              name: '',
              button1: '',
              button2: 'Re-Login '
            }
          });
        }
        this.dialogRef2.afterClosed().subscribe(result2 => {
          if (result2 === true) {
            this.authenticationService.logout();
            return throwError(err.error.message);
          } else {
            this.authenticationService.logout();
            return throwError(err.error.message);
          }
        }).add(() => this.dialogRef2 = null);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));

  }
}
