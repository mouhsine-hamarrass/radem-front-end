import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BoxedLayoutComponent} from './layouts/boxed-layout/boxed-layout.component';
import {TwoColumnsLayoutComponent} from './layouts/2-columns-layout/2-columns-layout.component';
import {HOME_ROUTES} from './routes/home-page.routes';
import {ACCOUNT_PAGES_ROUTES} from './routes/account-pages.routes';
import {SERVICES_PAGES_ROUTES} from './routes/services-pages.routes';
import {CONSUMPTION_ROUTES} from './routes/consumption-page.routes';
import {ADMIN_PAGES_ROUTES} from './routes/admin-pages.routes';
import {CONTRACTS_PAGE_ROUTES} from './routes/contracts-pages.routes';
import {SETTLEMENTS_PAGES_ROUTES} from './routes/settlements-page.routes';
import {UNPAID_PAGE_ROUTES} from './routes/unpaid-page.routes';
import {LoginGuard} from './core/guards/login.guard';
import {LoginComponent} from './login/login.component';
import {RecoverPasswordComponent} from './recover-password/recover-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {RegisterComponent} from './register/register.component';
import {EnableAccountComponent} from './enable-account/enable-account.component';
import {RegisterSuccesComponent} from './register-succes/register-succes.component';
import {TermOfUseComponent} from './term-of-use/term-of-use.component';
import {ADVICE_ROUTES} from './routes/advice-page.routes';
import {DYNAMIC_CONTENT_PAGES_ROUTES} from './routes/dynamic-content-pages.routes';
import {ALERT_NOTIFICATIONS_ROUTES} from './routes/alert-notifications-page.routes';
import {HomeComponent} from './home/home.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {INVOICE_PAGE_ROUTES} from './routes/invoices-page.routes';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {AccountGuard} from './core/guards/account-guard.service';
import {SERVICE_APPROACH_ROUTES} from './routes/service-approach-page.routes';
import {REFUND_REQUEST_ROUTES} from './routes/refund-request-page.routes';
import {REFUND_PRINT_ROUTES} from './routes/refund-print-page.routes';
import {PROVISIONAL_COUNTER_ROUTES} from './routes/provisional-counter-page.routes';
import {TAX_ROUTES} from './routes/tax-page.routes';
import {TERMINATION_ROUTES} from './routes/termination-page.routes';
import {COUNTER_PRINT_ROUTES} from './routes/counter-print-page.routes';
import {TAX_PRINT_ROUTES} from './routes/tax-print-page.routes';
import {TERMINATION_PRINT_ROUTES} from './routes/termination-print-page.routes';


const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: 'checkProfile', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recover-password', component: RecoverPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'enable-account', component: EnableAccountComponent},
  {path: 'register-succes', component: RegisterSuccesComponent},
  {path: 'term-of-use', component: TermOfUseComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: 'maintenance', component: MaintenanceComponent},
  // {path: 'login', component: BoxedLayoutComponent, data: {title: ''}, children: LOGIN_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: HOME_ROUTES, canActivate: [LoginGuard]},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: CONSUMPTION_ROUTES, canActivate: [LoginGuard]},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: ACCOUNT_PAGES_ROUTES, canActivate: [LoginGuard, AccountGuard ]},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: SERVICES_PAGES_ROUTES, canActivate: [LoginGuard]},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: DYNAMIC_CONTENT_PAGES_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: CONTRACTS_PAGE_ROUTES, canActivate: [LoginGuard]},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: SETTLEMENTS_PAGES_ROUTES, canActivate: [LoginGuard]},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: UNPAID_PAGE_ROUTES, canActivate: [LoginGuard]},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: INVOICE_PAGE_ROUTES, canActivate: [LoginGuard]},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: ADVICE_ROUTES, canActivate: [LoginGuard]},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: SERVICE_APPROACH_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: ALERT_NOTIFICATIONS_ROUTES, canActivate: [LoginGuard]},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: ADMIN_PAGES_ROUTES, canActivate: [LoginGuard]},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: REFUND_REQUEST_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: REFUND_PRINT_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: PROVISIONAL_COUNTER_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: COUNTER_PRINT_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: TAX_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: TAX_PRINT_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: TERMINATION_ROUTES},
  {path: '', component: BoxedLayoutComponent, data: {title: ''}, children: TERMINATION_PRINT_ROUTES},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
