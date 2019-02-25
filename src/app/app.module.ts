import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {BoxedLayoutComponent} from './layouts/boxed-layout/boxed-layout.component';

import {MaintenanceComponent} from './maintenance/maintenance.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {createTranslateLoader} from './app.translate.factory';
import {CoreModule} from './core/core.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {DashboardLayoutComponent} from './layouts/dashboard-layout/dashboard-layout.component';
import {BoxedWithSidebarLayoutComponent} from './layouts/boxed-with-sidebar-layout/boxed-with-sidebar-layout.component';
import {TwoColumnsLayoutComponent} from './layouts/2-columns-layout/2-columns-layout.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {RecoverPasswordComponent} from './recover-password/recover-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {BrowserModule} from '@angular/platform-browser';
import {RegisterComponent} from './register/register.component';
import {MainModule} from './main/main.module';
import {EnableAccountComponent} from './enable-account/enable-account.component';
import {EnableAccountService} from './main/services/enable-account.service';
import {RegisterSuccesComponent} from './register-succes/register-succes.component';
import {RecoverPasswordService} from './main/services/recover-password.service';
import {ToastrModule} from 'ngx-toastr';
import {TermOfUseComponent} from './term-of-use/term-of-use.component';
import {OnlinePaymentComponent} from './main/pages/services-pages/online-payment/online-payment.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxedLayoutComponent,
    TwoColumnsLayoutComponent,
    MaintenanceComponent,
    DashboardLayoutComponent,
    BoxedWithSidebarLayoutComponent,
    RecoverPasswordComponent,
    ResetPasswordComponent,
    RegisterComponent,
    EnableAccountComponent,
    RegisterSuccesComponent,
    TermOfUseComponent,
    OnlinePaymentComponent,
    HomeComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    CoreModule,
    ToastrModule.forRoot(),
    SharedModule,
    MainModule,
  ],
  providers: [
    {provide: 'api.config', useValue: environment.apiConfig},
    {provide: 'defaultLanguage', useValue: environment.defaultLanguage},
    EnableAccountService,
    RecoverPasswordService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
