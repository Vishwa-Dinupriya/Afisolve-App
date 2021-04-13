import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationComponent} from './authentication/authentication.component';
import {LoginComponent} from './authentication/login/login.component';
import {ProfilePictureDialogComponent, SignupComponent} from './authentication/signup/signup.component';
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
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './home/admin/dashboard/dashboard.component';
import {FeedbacksComponent} from './home/admin/feedbacks/feedbacks.component';
import {UsersComponent} from './home/admin/users/users.component';
import {ComplaintsComponent} from './home/admin/complaints/complaints.component';
import {ProductsComponent} from './home/admin/products/products.component';
import {RegisterProductComponent} from './home/admin/products/register-product/register-product.component';
import {ProductService} from './home/admin/products/product.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';

import {LateComplaintInformationComponent} from './home/projectManager/late-complaint-information/late-complaint-information.component';
import {ViewReportsComponent} from './home/projectManager/view-reports/view-reports.component';
import {ProfileComponent} from './home/projectManager/profile/profile.component';
import {ActionComponent} from './home/projectManager/late-complaint-information/action/action.component';

import {ImageCropperModule} from 'ngx-image-cropper';
import {TestComponent} from './home/admin/test/test.component';
import {UserProfileComponent} from './home/shared/user-profile/user-profile.component';
import {ComplaintProfileComponent} from './home/shared/complaint-profile/complaint-profile.component';
import {ProductProfileComponent} from './home/shared/product-profile/product-profile.component';
import {FeedbackProfileComponent} from './home/shared/feedback-profile/feedback-profile.component';
import {DialogBoxComponent} from './home/shared/dialog-box/dialog-box.component';

import {PageService, SortService, FilterService} from '@syncfusion/ej2-angular-treegrid';

import {ComplaintsCustomerComponent} from './home/customer/complaints-customer/complaints-customer.component';
import {DashboardCustomerComponent} from './home/customer/dashboard-customer/dashboard-customer.component';
import { ProductsCustomerComponent } from './home/customer/products-customer/products-customer.component';
import { TestCustomerComponent } from './home/customer/test-customer/test-customer.component';
import { AddNewComplaintComponent } from './home/customer/add-new-complaint/add-new-complaint.component';
import { PendingComplaintsComponent } from './home/customer/complaints-customer/pending-complaints/pending-complaints.component';
import { InProgressComplaintsComponent } from './home/customer/complaints-customer/in-progress-complaints/in-progress-complaints.component';
import { CompletedComplaintsComponent } from './home/customer/complaints-customer/completed-complaints/completed-complaints.component';
import { ClosedComplaintsComponent } from './home/customer/complaints-customer/closed-complaints/closed-complaints.component';
import { ReviewDialogBoxComponent } from './home/customer/complaints-customer/completed-complaints/review-dialog-box/review-dialog-box.component';
import { LodgeSubComplaintComponent } from './home/customer/complaints-customer/completed-complaints/lodge-sub-complaint/lodge-sub-complaint.component';
import { UserProfileForAdminPurposeComponent } from './home/admin/users/user-profile-for-admin-purpose/user-profile-for-admin-purpose.component';
import { UploadPictureComponent } from './home/shared/upload-picture/upload-picture.component';
import { DialogBoxSelectPictureComponent } from './home/shared/dialog-box-select-picture/dialog-box-select-picture.component';
import { CommentSectionComponent } from './home/shared/comment-section/comment-section.component';


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
    ProfilePictureDialogComponent,

    LateComplaintInformationComponent,
    ViewReportsComponent,
    ProfileComponent,
    ActionComponent,

    TestComponent,
    UserProfileComponent,
    ComplaintProfileComponent,
    ProductProfileComponent,
    FeedbackProfileComponent,
    DialogBoxComponent,

    ComplaintsCustomerComponent,
    DashboardCustomerComponent,
    ProductsCustomerComponent,
    TestCustomerComponent,
    AddNewComplaintComponent,
    PendingComplaintsComponent,
    InProgressComplaintsComponent,
    CompletedComplaintsComponent,
    ClosedComplaintsComponent,
    ReviewDialogBoxComponent,
    LodgeSubComplaintComponent,
    UserProfileForAdminPurposeComponent,
    UploadPictureComponent,
    DialogBoxSelectPictureComponent,
    CommentSectionComponent,

  ],
  entryComponents: [DialogBoxComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ImageCropperModule,
    MatGridListModule,
    MatDialogModule
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
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
