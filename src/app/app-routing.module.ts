import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthenticationComponent} from './authentication/authentication.component';
import {LoginComponent} from './authentication/login/login.component';
import {SignupComponent} from './authentication/signup/signup.component';

import {HomeComponent} from './home/home.component';

import {CustomerComponent} from './home/customer/customer.component';
import {AdminComponent} from './home/admin/admin.component';
import {CeoComponent} from './home/ceo/ceo.component';
import {AccountCoordinatorComponent} from './home/accountCoordinator/account-coordinator.component';
import {DeveloperComponent} from './home/developer/developer.component';
import {ProjectManagerComponent} from './home/projectManager/project-manager.component';

import {AuthenticationGuard} from './authentication/authentication.guard';
import {ComplaintComponent} from './home/admin/complaint/complaint.component';
import {UserComponent} from './home/admin/user/user.component';

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
          canActivate: [AuthenticationGuard]
        },
        {
          path: 'accountCoordinator',
          component: AccountCoordinatorComponent,
          canActivate: [AuthenticationGuard]
        },
        {
          path: 'admin',
          component: AdminComponent,
          canActivate: [AuthenticationGuard],
          children: [
            {
              path: 'complaints',
              component: ComplaintComponent
            },
            {
              path: 'users',
              component: UserComponent
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
          path: 'projectManager',
          component: ProjectManagerComponent,
          canActivate: [AuthenticationGuard]
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

