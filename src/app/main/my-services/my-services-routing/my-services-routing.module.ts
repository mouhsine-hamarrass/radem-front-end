import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MyServicesComponent} from '../my-services.component';
import {ClaimRequestComponent} from '../claim-request/claim-request.component';
import {SubscribeRequestComponent} from '../subscribe-request/subscribe-request.component';

const routes: Routes = [
  {
    path: 'my-services',
    component: MyServicesComponent,
    children: [
      {
        path: 'claim-request',
        component: ClaimRequestComponent
      },
      {
        path: 'subscribe-request',
        component: SubscribeRequestComponent
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
export class MyServicesRoutingModule { }
