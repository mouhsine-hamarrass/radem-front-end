import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {BoxedLayoutComponent} from './layouts/boxed-layout/boxed-layout.component';

import {MaintenanceComponent} from './maintenance/maintenance.component';
import {PageNotFoundComponent} from './main/pages/page-not-found/page-not-found.component';
import {createTranslateLoader} from './app.translate.factory';
import {CoreModule} from './core/core.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {environment} from 'environments/environment';
import {DashboardLayoutComponent} from './layouts/dashboard-layout/dashboard-layout.component';
import {BoxedWithSidebarLayoutComponent} from './layouts/boxed-with-sidebar-layout/boxed-with-sidebar-layout.component';
import {TwoColumnsLayoutComponent} from './layouts/2-columns-layout/2-columns-layout.component';
import {ServicesService} from './main/services/services.service';
import { ContractsService } from './main/services/contracts.service';
import { ProfilePageComponent } from './main/pages/profile-page/profile-page.component';
import { ProfileService } from './main/services/profile.service';
import { RecoverPasswordComponent } from './main/pages/recover-password/recover-password.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxedLayoutComponent,
    TwoColumnsLayoutComponent,
    MaintenanceComponent,
    PageNotFoundComponent,
    DashboardLayoutComponent,
    BoxedWithSidebarLayoutComponent,
    RecoverPasswordComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: 'api.config', useValue: environment.apiConfig},
    {provide: 'defaultLanguage', useValue: environment.defaultLanguage},
    ServicesService,
    ContractsService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
