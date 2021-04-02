import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationComponent} from './authentication/authentication.component';
import {LoginComponent} from './authentication/login/login.component';
import {SignupComponent} from './authentication/signup/signup.component';
import {MaterialModule} from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './home/admin/dashboard/dashboard.component';
import {FeedbacksComponent} from './home/admin/feedbacks/feedbacks.component';
import {UsersComponent} from './home/admin/users/users.component';
import {ComplaintsComponent} from './home/admin/complaints/complaints.component';
import {ProductsComponent} from './home/admin/products/products.component';
import {RegisterProductComponent} from './home/admin/products/register-product/register-product.component';
import {ProductService} from './home/services/product.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { LateComplaintInformationComponent } from './home/projectManager/late-complaint-information/late-complaint-information.component';
import { ViewReportsComponent } from './home/projectManager/view-reports/view-reports.component';
import { ProfileComponent } from './home/projectManager/profile/profile.component';
import { ActionComponent } from './home/projectManager/late-complaint-information/action/action.component';

import {ProfilePictureComponent} from './home/shared/profile/profile-picture/profile-picture.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {TestComponent} from './home/admin/test/test.component';
import {TestSortingComponent} from './home/admin/test-sorting/test-sorting.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';




import {UserProfileComponent} from './home/shared/user-profile/user-profile.component';
import {ComplaintProfileComponent} from './home/shared/complaint-profile/complaint-profile.component';
import {ProductProfileComponent} from './home/shared/product-profile/product-profile.component';
import {FeedbackProfileComponent} from './home/shared/feedback-profile/feedback-profile.component';
import { CdashboardComponent } from './home/ceo/cdashboard/cdashboard.component';
import { ClateComponent } from './home/ceo/clate/clate.component';
import { CviewreportsComponent } from './home/ceo/cviewreports/cviewreports.component';
import { PdashboardComponent } from './home/projectManager/pdashboard/pdashboard.component';
import { CactionComponent } from './home/ceo/clate/caction/caction.component';


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
    HomeComponent,
    DashboardComponent,
    FeedbacksComponent,
    UsersComponent,
    ComplaintsComponent,
    ProductsComponent,
    RegisterProductComponent,

    LateComplaintInformationComponent,
    ViewReportsComponent,
    ProfileComponent,
    ActionComponent,

    ProfilePictureComponent,
    TestComponent,
    TestSortingComponent,
    UserProfileComponent,
    ComplaintProfileComponent,
    ProductProfileComponent,
    FeedbackProfileComponent,
    CdashboardComponent,
    ClateComponent,
    CviewreportsComponent,
    PdashboardComponent,
    CactionComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ImageCropperModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatGridListModule,
    MatBadgeModule,
    MatCheckboxModule,
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
