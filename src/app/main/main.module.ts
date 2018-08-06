import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServicesService} from './services/services.service';
import {CommonService} from './services/common.service';
import {AdminPagesModule} from './pages/admin-pages/admin-pages.module';
import {ConsumptionPageModule} from './pages/consumption-page/consumption-page.module';
import {ContractPagesModule} from './pages/contract-pages/contract-pages.module';
import {DemoPagesModule} from './pages/demo-pages/demo-pages.module';
import {HomePageModule} from './pages/home-page/home-page.module';
import {ProfilePageModule} from './pages/profile-page/profile-page.module';
import {ServicesPagesModule} from './pages/services-pages/services-pages.module';
import {UnpaidPagesModule} from './pages/unpaid-pages/unpaid-pages.module';
import {SharedModule} from '../shared/shared.module';
import {FilterComponent} from '../shared/components/tables/filter/filter.component';
import {PaginationComponent} from '../shared/components/tables/pagination/pagination.component';
import {SearchComponent} from '../shared/components/tables/search/search.component';

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
    UnpaidPagesModule
  ],
  providers: [
    ServicesService,
    CommonService,
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
    ServicesPagesModule,
    UnpaidPagesModule
  ]
})
export class MainModule {
}
