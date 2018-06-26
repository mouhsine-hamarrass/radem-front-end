import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountComponent} from './account.component';
import {ProfilesComponent} from './profiles/profiles.component';
import {ContractsComponent} from './contracts/contracts.component';
import {SettlementComponent} from './settlement/settlement.component';
import {UnpaidComponent} from './unpaid/unpaid.component';
import {AccountRoutingModule} from './account-routing/account-routing.module';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {ChartsModule} from 'ng2-charts';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    BsDatepickerModule,
    ChartsModule,
    SharedModule
  ],
  declarations: [
    AccountComponent,
    ProfilesComponent,
    ContractsComponent,
    SettlementComponent,
    UnpaidComponent
  ]
})
export class AccountModule {
}
