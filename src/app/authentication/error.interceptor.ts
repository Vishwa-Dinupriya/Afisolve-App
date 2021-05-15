import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 0) {
        return throwError('Network connection failure (from error interceptor)');
      } else if (err.status === 408) {
        this.router.navigate(['', {timeout: true}]);
      } else if (err.status === 401) {
        this.router.navigate(['/']);
        return throwError('Invalid token (from error interceptor)');
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));

  }
}
