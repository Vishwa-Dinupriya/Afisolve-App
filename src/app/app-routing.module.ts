import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthenticationComponent} from './authentication/authentication.component';
import {LoginComponent} from './authentication/login/login.component';
import {SignupComponent} from './authentication/signup/signup.component';
import {AuthenticationGuard} from './authentication/authentication.guard';


import {HomeComponent} from './home/home.component';

import {CustomerComponent} from './home/customer/customer.component';
import {CeoComponent} from './home/ceo/ceo.component';
import {AccountCoordinatorComponent} from './home/accountCoordinator/account-coordinator.component';
import {DeveloperComponent} from './home/developer/developer.component';
import {ProjectManagerComponent} from './home/projectManager/project-manager.component';

import {AdminComponent} from './home/admin/admin.component';
import {DashboardComponent} from './home/admin/dashboard/dashboard.component';
import {ComplaintsComponent} from './home/admin/complaints/complaints.component';
import {UsersComponent} from './home/admin/users/users.component';
import {FeedbacksComponent} from './home/admin/feedbacks/feedbacks.component';
import {ProductsComponent} from './home/admin/products/products.component';
import {RegisterProductComponent} from './home/admin/products/register-product/register-product.component';

import {LateComplaintInformationComponent} from './home/projectManager/late-complaint-information/late-complaint-information.component';
import {ViewReportsComponent} from './home/projectManager/view-reports/view-reports.component';


import {TestComponent} from './home/admin/test/test.component';
import {UserProfileComponent} from './home/shared/user-profile/user-profile.component';

import {CdashboardComponent} from './home/ceo/cdashboard/cdashboard.component';
import {ClateComponent} from './home/ceo/clate/clate.component';
import {CviewreportsComponent} from './home/ceo/cviewreports/cviewreports.component';
import {PdashboardComponent} from './home/projectManager/pdashboard/pdashboard.component';
import {DashboardCustomerComponent} from './home/customer/dashboard-customer/dashboard-customer.component';
import {ComplaintsCustomerComponent} from './home/customer/complaints-customer/complaints-customer.component';
import {ProductsCustomerComponent} from './home/customer/products-customer/products-customer.component';
import {AddNewComplaintComponent} from './home/customer/add-new-complaint/add-new-complaint.component';
import {PendingComplaintsComponent} from './home/customer/complaints-customer/pending-complaints/pending-complaints.component';
import {InProgressComplaintsComponent} from './home/customer/complaints-customer/in-progress-complaints/in-progress-complaints.component';
import {CompletedComplaintsComponent} from './home/customer/complaints-customer/completed-complaints/completed-complaints.component';
import {ClosedComplaintsComponent} from './home/customer/complaints-customer/closed-complaints/closed-complaints.component';


const routes: Routes = [
    {
      path: '',
      component: AuthenticationComponent,
      children: [
        {
          path: '',
          component: LoginComponent
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'signup',
          component: SignupComponent
        },
      ]
    },
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthenticationGuard],
      children: [
        {
          path: 'customer',
          component: CustomerComponent,
          canActivate: [AuthenticationGuard],
          children: [
            {
              path: '',
              component: DashboardCustomerComponent,
            },
            {
              path: 'dashboard',
              component: DashboardCustomerComponent,
            },
            {
              path: 'lodge-new-complaint',
              component: AddNewComplaintComponent,
            },
            {
              path: 'complaints',
              component: ComplaintsCustomerComponent,
            },
            {
              path: 'pending-complaints',
              component: PendingComplaintsComponent,
            },
            {
              path: 'in-progress-complaints',
              component: InProgressComplaintsComponent,
            },
            {
              path: 'completed-complaints',
              component: CompletedComplaintsComponent,
            },
            {
              path: 'past-complaints',
              component: ClosedComplaintsComponent,
            },
            {
              path: 'purchases',
              component: ProductsCustomerComponent,
            }
          ]
        },
        {
          path: 'account-coordinator',
          component: AccountCoordinatorComponent,
          canActivate: [AuthenticationGuard]
        },
        {
          path: 'admin',
          component: AdminComponent,
          canActivate: [AuthenticationGuard],
          children: [
            {
              path: '',
              component: DashboardComponent
            },
            {
              path: 'dashboard',
              component: DashboardComponent
            },
            {
              path: 'complaints',
              component: ComplaintsComponent
            },
            {
              path: 'users',
              component: UsersComponent,
              children: [
                {
                  path: 'user-profile',
                  component: UserProfileComponent
                }
              ]
            },
            {
              path: 'products',
              component: ProductsComponent,
              children: [
                {
                  path: 'register-product',
                  component: RegisterProductComponent
                }
              ]
            },
            {
              path: 'feedbacks',
              component: FeedbacksComponent
            },
            {
              path: 'test',
              component: TestComponent
            },
          ]
        },
        {
          path: 'ceo',
          component: CeoComponent,
          canActivate: [AuthenticationGuard],
          children: [
            {
              path: 'cdashboard',
              component: CdashboardComponent
            },
            {
              path: 'clate',
              component: ClateComponent,
            },
            {
              path: 'cviewreports',
              component: CviewreportsComponent
            },
          ]
        },
        {
          path: 'developer',
          component: DeveloperComponent,
          canActivate: [AuthenticationGuard]
        },
        {
          path: 'project-manager',
          component: ProjectManagerComponent,
          canActivate: [AuthenticationGuard],
          children: [
            {
              path: 'pdashboard',
              component: PdashboardComponent
            },
            {
              path: 'late-complaint-information',
              component: LateComplaintInformationComponent
            },
            {
              path: 'view-reports',
              component: ViewReportsComponent
            },
          ]
        },
      ]
    },
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

