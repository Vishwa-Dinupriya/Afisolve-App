import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationComponent} from './authentication/authentication.component';
import {LoginComponent} from './authentication/login/login.component';
import {SignupComponent} from './authentication/signup/signup.component';
import {MaterialModule} from './material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AccountCoordinatorComponent} from './home/accountCoordinator/account-coordinator.component';
import {AuthenticationService} from './authentication/authentication.service';
import {AuthenticationGuard} from './authentication/authentication.guard';
import {TokenInterceptor} from './authentication/token.interceptor';
import {AdminComponent} from './home/admin/admin.component';
import {CustomerComponent} from './home/customer/customer.component';
import {CeoComponent} from './home/ceo/ceo.component';
import {DeveloperComponent} from './home/developer/developer.component';
import {ProjectManagerComponent} from './home/projectManager/project-manager.component';
import {ErrorInterceptor} from './authentication/error.interceptor';
import { ComplaintComponent } from './home/admin/complaint/complaint.component';
import { UserComponent } from './home/admin/user/user.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    SignupComponent,
    CustomerComponent,
    AdminComponent,
    CeoComponent,
    AccountCoordinatorComponent,
    DeveloperComponent,
    ProjectManagerComponent,
    ComplaintComponent,
    UserComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthenticationService,
    AuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
