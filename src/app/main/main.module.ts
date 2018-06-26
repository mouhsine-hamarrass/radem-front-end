import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GlobalSharedModule, MY_MOMENT_FORMATS} from '../shared/global-shared.module';
import {OWL_DATE_TIME_FORMATS} from 'ng-pick-datetime';
import {HomeComponent} from './home/home.component';
import {SharedModule} from './shared/shared.module';
import {UtilsService} from './core/services/utils.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import {BsDropdownModule, ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountModule} from './account/account.module';
import {MyServicesModule} from './my-services/my-services.module';
import { AdminComponent } from './admin/admin.component';
import { RequestComponent } from './admin/request/request.component';
import { ListRequestsComponent } from './admin/list-requests/list-requests.component';
import { ListComplaintsComponent } from './admin/list-complaints/list-complaints.component';


@NgModule({
  imports: [
    CommonModule,
    GlobalSharedModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AccountModule,
    MyServicesModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    AccountModule,
    MyServicesModule
  ],
  declarations: [
    HomeComponent,
    DashboardComponent,
    ConsumptionComponent,
    AdminComponent,
    RequestComponent,
    ListRequestsComponent,
    ListComplaintsComponent
  ],
  providers: [
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
    UtilsService
  ]
})
export class MainModule {
}
