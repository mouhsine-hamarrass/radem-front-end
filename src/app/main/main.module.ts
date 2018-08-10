import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServicesService} from './services/services.service';
import {AdminPagesModule} from './pages/admin-pages/admin-pages.module';
import {ConsumptionPageModule} from './pages/consumption-page/consumption-page.module';
import {ContractPagesModule} from './pages/contract-pages/contract-pages.module';
import {DemoPagesModule} from './pages/demo-pages/demo-pages.module';
import {HomePageModule} from './pages/home-page/home-page.module';
import {ProfilePageModule} from './pages/profile-page/profile-page.module';
import {ServicesPagesModule} from './pages/services-pages/services-pages.module';
import {UtilsService} from './services/utils.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {createTranslateLoader} from '../app.translate.factory';

@NgModule({
  imports: [
    CommonModule,
    AdminPagesModule,
    ConsumptionPageModule,
    ContractPagesModule,
    DemoPagesModule,
    HomePageModule,
    ProfilePageModule,
    ServicesPagesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    ServicesService,
    UtilsService
  ],
  declarations: [],
  exports: [
    CommonModule,
    AdminPagesModule,
    ConsumptionPageModule,
    ContractPagesModule,
    DemoPagesModule,
    HomePageModule,
    ProfilePageModule,
    ServicesPagesModule
  ]
})
export class MainModule {
}
