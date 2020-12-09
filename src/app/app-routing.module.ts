import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthenticationGuard} from './authentication/authentication.guard';

import {AuthenticationComponent} from './authentication/authentication.component';
import {LoginComponent} from './authentication/login/login.component';
import {SignupComponent} from './authentication/signup/signup.component';

import {CustomerComponent} from './customer/customer.component';
import {AdminComponent} from './admin/admin.component';
import {CeoComponent} from './ceo/ceo.component';
import {AccountCoordinatorComponent} from './accountCoordinator/account-coordinator.component';
import {DeveloperComponent} from './developer/developer.component';
import {ProjectManagerComponent} from './projectManager/project-manager.component';

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
        }
      ]
    },
    {
      path: 'customer',
      component: CustomerComponent,
      canActivate: [AuthenticationGuard]
    },
    {
      path: 'admin',
      component: AdminComponent,
      canActivate: [AuthenticationGuard]
    },
    {
      path: 'ceo',
      component: CeoComponent,
      canActivate: [AuthenticationGuard]
    },
    {
      path: 'accountCoordinator',
      component: AccountCoordinatorComponent,
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
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

