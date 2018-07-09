import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UnpaidComponent} from './unpaid/unpaid.component';
import {ContractsComponent} from './contracts/contracts.component';
import {SettingsComponent} from './settings/settings.component';
import {SettlementsComponent} from './settlements/settlements.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'contracts',
        component: ContractsComponent,
        data: {
          title: 'Contracts'
        }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          title: 'Settings'
        }
      },
      {
        path: 'settlements',
        component: SettlementsComponent,
        data: {
          title: 'Settlements'
        }
      },
      {
        path: 'unpaid',
        component: UnpaidComponent,
        data: {
          title: 'Unpaid'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPagesRoutingModule { }
