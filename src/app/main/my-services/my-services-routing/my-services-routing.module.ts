import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MyServicesComponent} from '../my-services.component';
import {SubscribeRequestComponent} from '../subscribe-request/subscribe-request.component';
import {OnlinePaymentComponent} from '../online-payment/online-payment.component';
import { TerminationComponent } from '../termination/termination.component';
import { NewTerminationComponent } from '../new-termination/new-termination.component';
import { TerminationRequestsComponent } from '../termination-requests/termination-requests.component';
import { ComplaintComponent } from '../complaint/complaint.component';

const routes: Routes = [
  {
    path: 'my-services',
    component: MyServicesComponent,
    children: [
      {
        path: 'complaint',
        component: ComplaintComponent
      },
      {
        path: 'subscribe-request',
        component: SubscribeRequestComponent
      },
      {
        path: 'termination',
        component: TerminationComponent
      },
      {
        path: 'termination-requests',
        component: TerminationRequestsComponent
      },
      {
        path: 'new-termination',
        component: NewTerminationComponent
      },
      {
        path: 'online-payment',
        component: OnlinePaymentComponent
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
