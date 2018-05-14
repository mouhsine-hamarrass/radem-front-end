import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GlobalSharedModule, MY_MOMENT_FORMATS} from '../shared/global-shared.module';
import {OWL_DATE_TIME_FORMATS} from 'ng-pick-datetime';
import {HomeComponent} from './home/home.component';
import {SharedModule} from './shared/shared.module';
import {UtilsService} from './core/services/utils.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ServicesComponent} from './services/services.component';
import {ComptesComponent} from './comptes/comptes.component';
import {ConsomationComponent} from './consomation/consomation.component';
import { ContratsComponent } from './comptes/contrats/contrats.component';

@NgModule({
  imports: [
    CommonModule,
    GlobalSharedModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    HomeComponent,
    DashboardComponent,
    ServicesComponent,
    ComptesComponent,
    ConsomationComponent,
    ContratsComponent],
  providers: [
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
    UtilsService
  ]
})
export class MainModule {
}
