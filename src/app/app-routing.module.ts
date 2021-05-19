import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthenticationComponent} from './authentication/authentication.component';
import {LoginComponent} from './authentication/login/login.component';
import {SignupComponent} from './authentication/signup/signup.component';
import {AuthenticationGuard} from './authentication/authentication.guard';


import {HomeComponent} from './home/home.component';

import {CustomerComponent} from './home/customer/customer.component';
import {CeoComponent} from './home/ceo/ceo.component';
import {DeveloperComponent} from './home/developer/developer.component';
import {ProjectManagerComponent} from './home/projectManager/project-manager.component';

import {AdminComponent} from './home/admin/admin.component';
import {DashboardComponent} from './home/admin/dashboard/dashboard.component';
import {ComplaintsComponent} from './home/admin/complaints/complaints.component';
import {UsersComponent} from './home/admin/users/users.component';
import {FeedbacksComponent} from './home/admin/feedbacks/feedbacks.component';
import {ProductsComponent} from './home/admin/products/products.component';
import {RegisterProductComponent} from './home/admin/products/register-product/register-product.component';


import {AccountCoordinatorComponent} from './home/accountCoordinator/account-coordinator.component';
import {AccoorcomplaintsComponent} from './home/accountCoordinator/accoorcomplaints/accoorcomplaints.component';
import {TasksComponent} from './home/accountCoordinator/tasks/tasks.component';
import {AddComplaintComponent} from './home/accountCoordinator/accoorcomplaints/add-complaint/add-complaint.component';
import {CreateTaskComponent} from './home/accountCoordinator/tasks/create-task/create-task.component';
import {AllocationComponent} from './home/accountCoordinator/allocation/allocation.component';
import {MailComponent} from './home/accountCoordinator/mail/mail.component';
import {DevtasksComponent} from './home/developer/devtasks/devtasks.component';


import {LateComplaintInformationComponent} from './home/projectManager/late-complaint-information/late-complaint-information.component';
import {ViewReportsComponent} from './home/projectManager/view-reports/view-reports.component';

import {TestComponent} from './home/admin/test/test.component';
import {UserProfileComponent} from './home/shared/user-profile/user-profile.component';

import {DevcomplaintsComponent} from './home/developer/devcomplaints/devcomplaints.component';
import {DevproductsComponent} from './home/developer/devproducts/devproducts.component';
import {TaskProfileComponent} from './home/accountCoordinator/tasks/task-profile/task-profile.component';


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


import {UpdateComplaintStatusComponent} from './home/accountCoordinator/accoorcomplaints/update-complaint-status/update-complaint-status.component';
import {AccoorcomplaintProfileCurrentComponent} from './home/accountCoordinator/accoorcomplaints/accoorcomplaint-profile-current/accoorcomplaint-profile-current.component';
import {AccoorproductsComponent} from './home/accountCoordinator/accoorproducts/accoorproducts.component';
import {DevtasksProfileComponent} from './home/developer/devtasks/devtasks-profile/devtasks-profile.component';
import {UpdateDevtaskStatusComponent} from './home/developer/devtasks/update-devtask-status/update-devtask-status.component';

import {DevMailComponent} from './home/developer/dev-mail/dev-mail.component';
import {AssignNewDeveloperComponent} from './home/accountCoordinator/tasks/assign-new-developer/assign-new-developer.component';

import {AllUsersComponent} from './home/admin/users/all-users/all-users.component';
import {UserProfileForAdminPurposeComponent} from './home/admin/users/all-users/user-profile-for-admin-purpose/user-profile-for-admin-purpose.component';
import {AllProductsComponent} from './home/admin/products/all-products/all-products.component';
import {MailToCustomerComponent} from './home/accountCoordinator/mail/mail-to-customer/mail-to-customer.component';
import {MailToDeveloperComponent} from './home/accountCoordinator/mail/mail-to-developer/mail-to-developer.component';
import {MailToAccountCoComponent} from './home/developer/dev-mail/mail-to-account-co/mail-to-account-co.component';



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
              children: [
                {
                  path: 'pending-complaints',
                  component: PendingComplaintsComponent,
                },
                {
                  path: '',
                  redirectTo: 'pending-complaints',
                  pathMatch: 'full'
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
                }
              ]
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
          canActivate: [AuthenticationGuard],
          children: [
            {
              path: '',
              component: AccoorcomplaintsComponent,
              children: [
                {
                  path: 'add-complaint',
                  component: AddComplaintComponent
                },
                {
                  path: 'update-complaintStatus',
                  component: UpdateComplaintStatusComponent
                },
                {
                  path: 'accoorcomplaint-profile-current',
                  component: AccoorcomplaintProfileCurrentComponent
                },
              ]
            },
            {
              path: 'accoorcomplaints',
              component: AccoorcomplaintsComponent
            },
            {
              path: 'tasks',
              component: TasksComponent,
              children: [
                {
                  path: 'create-task',
                  component: CreateTaskComponent
                },
                {
                  path: 'assign-new-developer',
                  component: AssignNewDeveloperComponent
                },
                {
                  path: 'task-profile',
                  component: TaskProfileComponent
                }
              ]
            },
            {
              path: 'allocation',
              component: AllocationComponent
            },
            {
              path: 'mail',
              component: MailComponent,
              children: [
                {
                  path: 'mail-to-customer',
                  component: MailToCustomerComponent
                },
                {
                  path: 'mail-to-developer',
                  component: MailToDeveloperComponent
                }]
            },
            {
              path: 'accoorproducts',
              component: AccoorproductsComponent
            },
          ]
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
                  path: '',
                  redirectTo: 'all-users',
                  pathMatch: 'full'
                },
                {
                  path: 'all-users',
                  component: AllUsersComponent
                },
                {
                  path: 'new-user',
                  component: SignupComponent
                }
              ]
            },
            {
              path: 'products',
              component: ProductsComponent,
              children: [
                {
                  path: '',
                  redirectTo: 'all-products',
                  pathMatch: 'full'
                },
                {
                  path: 'all-products',
                  component: AllProductsComponent
                },
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
              path: '',
              component: CdashboardComponent
            },
            {
              path: 'dashboard',
              component: CdashboardComponent
            },
            {
              path: 'late-complaint-information',
              component: ClateComponent
            },
            {
              path: 'view-complaints',
              component: CviewreportsComponent
            },
          ]
        },
        {
          path: 'developer',
          component: DeveloperComponent,
          canActivate: [AuthenticationGuard],
          children: [
            {
              path: '',
              component: DevtasksComponent,
              children: [
                {
                  path: 'devtasks-profile',
                  component: DevtasksProfileComponent,
                },
                {
                  path: 'update-devtask-status',
                  component: UpdateDevtaskStatusComponent,
                }
              ]
            },
            {
              path: 'devtasks',
              component: DevtasksComponent,
            },
            {
              path: 'devcomplaints',
              component: DevcomplaintsComponent,
            },
            {
              path: 'devproducts',
              component: DevproductsComponent,
            },
            {
              path: 'devmail',
              component: DevMailComponent,
              children: [
                {
                  path: 'mail-to-account-co',
                  component: MailToAccountCoComponent
                }]
            }
          ]
        },
        {
          path: 'project-manager',
          component: ProjectManagerComponent,
          canActivate: [AuthenticationGuard],
          children: [
            {
              path: '',
              component: PdashboardComponent
            },
            {
              path: 'dashboard',
              component: PdashboardComponent
            },
            {
              path: 'late-complaint-information',
              component: LateComplaintInformationComponent
            },
            {
              path: 'view-complaints',
              component: ViewReportsComponent,
            }
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

