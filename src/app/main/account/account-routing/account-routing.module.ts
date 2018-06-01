import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ContractsComponent} from '../contracts/contracts.component';
import {ProfilesComponent} from '../profiles/profiles.component';
import {SettlementComponent} from '../settlement/settlement.component';
import {UnpaidComponent} from '../unpaid/unpaid.component';
import {AccountComponent} from '../account.component';

const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {
        path: 'profiles',
        component: ProfilesComponent
      },
      {
        path: 'contracts',
        component: ContractsComponent
      },
      {
        path: 'settlement',
        component: SettlementComponent
      },
      {
        path: 'unpaid',
        component: UnpaidComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
