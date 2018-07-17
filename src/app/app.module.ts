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
import {environment} from '../environments/environment';
import {DashboardLayoutComponent} from './layouts/dashboard-layout/dashboard-layout.component';
import {BoxedWithSidebarLayoutComponent} from './layouts/boxed-with-sidebar-layout/boxed-with-sidebar-layout.component';
import {TwoColumnsLayoutComponent} from './layouts/2-columns-layout/2-columns-layout.component';
import {ServicesService} from './main/services/services.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    BoxedLayoutComponent,
    TwoColumnsLayoutComponent,
    MaintenanceComponent,
    PageNotFoundComponent,
    DashboardLayoutComponent,
    BoxedWithSidebarLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
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
    ServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
