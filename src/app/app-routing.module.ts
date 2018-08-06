import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BoxedLayoutComponent} from './layouts/boxed-layout/boxed-layout.component';
import {TwoColumnsLayoutComponent} from './layouts/2-columns-layout/2-columns-layout.component';
import {HOME_ROUTES} from './routes/home-page.routes';
import {ACCOUNT_PAGES_ROUTES} from './routes/account-pages.routes';
import {SERVICES_PAGES_ROUTES} from './routes/services-pages.routes';
import {CONSUMPTION_ROUTES} from './routes/consumption-page.routes';
import {ADMIN_PAGES_ROUTES} from './routes/admin-pages.routes';
import {CONTRACT_PAGES_ROUTES} from './routes/contracts-pages.routes';
import {PROFILE_PAGE_ROUTES} from './routes/profile-page.routes';
import {LoginGuard} from './core/guards/login.guard';
import {LoginComponent} from './login/login.component';
import {RecoverPasswordComponent} from './recover-password/recover-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {UNPAID_PAGES_ROUTES} from './routes/unpaid-pages.routes';
import {RegisterComponent} from './register/register.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recover-password', component: RecoverPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: '', component: LoginComponent},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: HOME_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: CONSUMPTION_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: ACCOUNT_PAGES_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: SERVICES_PAGES_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: UNPAID_PAGES_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: CONTRACT_PAGES_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: PROFILE_PAGE_ROUTES},
  {path: '', component: TwoColumnsLayoutComponent, data: {title: ''}, children: ADMIN_PAGES_ROUTES},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
