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
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {BrowserModule} from '@angular/platform-browser';
import {RegisterComponent} from './register/register.component';
import {MainModule} from './main/main.module';

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
    RegisterComponent
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
    SharedModule,
    MainModule,
  ],
  providers: [
    {provide: 'api.config', useValue: environment.apiConfig},
    {provide: 'defaultLanguage', useValue: environment.defaultLanguage},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
