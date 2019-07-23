import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './account/account.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile.png',
        component: AccountComponent,
        data: {
          title: 'Mon profil'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPagesRoutingModule { }
