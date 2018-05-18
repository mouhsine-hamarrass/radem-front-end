import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GlobalSharedModule, MY_MOMENT_FORMATS} from '../shared/global-shared.module';
import {OWL_DATE_TIME_FORMATS} from 'ng-pick-datetime';
import {HomeComponent} from './home/home.component';
import {SharedModule} from './shared/shared.module';
import {UtilsService} from './core/services/utils.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import { MyServicesComponent } from './my-services/my-services.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import {BsDropdownModule, ModalModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    GlobalSharedModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [],
  declarations: [
    HomeComponent,
    DashboardComponent,
    MyServicesComponent,
    ConsumptionComponent
  ],
  providers: [
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
    UtilsService
  ]
})
export class MainModule {
}
