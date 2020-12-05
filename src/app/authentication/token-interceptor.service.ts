import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {userError} from '@angular/compiler-cli/src/transformers/util';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) {
  }

  intercept(req: HttpRequest<any>, next): any {
    const authentication = this.injector.get(AuthenticationService);
    const currentUser = authentication.token;
    if (currentUser) {
      req = req.clone({
        setHeaders: {
          Authentication: `Bearer ${currentUser}`
        }
      });
    }
    return next.handle(req);
  }

}
