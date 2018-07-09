import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContractsComponent} from './contracts/contracts.component';
import {SettingsComponent} from './settings/settings.component';
import {SettlementsComponent} from './settlements/settlements.component';
import {UnpaidComponent} from './unpaid/unpaid.component';
import {AccountPagesRoutingModule} from './account-pages-routing.module';
import {ChartsModule} from 'ng2-charts';
import {BsDatepickerModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AccountPagesRoutingModule,
    ChartsModule,
    BsDatepickerModule
  ],
  declarations: [
    ContractsComponent,
    SettingsComponent,
    SettlementsComponent,
    UnpaidComponent
  ]
})
export class AccountPagesModule {
}
