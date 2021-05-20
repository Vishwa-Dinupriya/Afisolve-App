import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {userError} from '@angular/compiler-cli/src/transformers/util';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next): any {
    const authenticationService = this.injector.get(AuthenticationService);
    const currentUser = authenticationService.token;
    // console.log(`Bearer ${currentUser}`);

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
