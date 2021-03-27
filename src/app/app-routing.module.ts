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
import {ProfileComponent} from './home/projectManager/profile/profile.component';
import {ActionComponent} from './home/projectManager/late-complaint-information/action/action.component';

import {TestComponent} from './home/admin/test/test.component';
import {TestSortingComponent} from './home/admin/test-sorting/test-sorting.component';
import {UserProfileComponent} from './home/shared/user-profile/user-profile.component';
import {DashboardCustomerComponent} from './home/customer/dashboard-customer/dashboard-customer.component';
import {ComplaintsCustomerComponent} from './home/customer/complaints-customer/complaints-customer.component';
import {ProductsCustomerComponent} from './home/customer/products-customer/products-customer.component';
import {AddNewComplaintComponent} from './home/customer/add-new-complaint/add-new-complaint.component';
import {PendingComplaintsComponent} from './home/customer/pending-complaints/pending-complaints.component';
import {InProgressComplaintsComponent} from './home/customer/in-progress-complaints/in-progress-complaints.component';
import {CompletedComplaintsComponent} from './home/customer/completed-complaints/completed-complaints.component';
import {ClosedComplaintsComponent} from './home/customer/closed-complaints/closed-complaints.component';

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
          children : [
            {
              path: '',
              component: DashboardCustomerComponent,
            },
            {
              path: 'complaints',
              component: ComplaintsCustomerComponent,
            },
            {
              path: 'lodge-new-complaint',
              component: AddNewComplaintComponent,
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
            {
              path: 'test-sorting',
              component: TestSortingComponent
            }
          ]
        },
        {
          path: 'ceo',
          component: CeoComponent,
          canActivate: [AuthenticationGuard]
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
              path: 'late-complaint-information',
              component: LateComplaintInformationComponent,
              children: [
                {
                  path: 'action',
                  component: ActionComponent
                },
              ]
            },
            {
              path: 'view-reports',
              component: ViewReportsComponent
            },
            {
              path: 'profile',
              component: ProfileComponent
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

