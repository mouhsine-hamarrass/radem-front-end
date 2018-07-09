import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CancellationRequestComponent} from './cancellation-request/cancellation-request.component';
import {ClaimRequestComponent} from './claim-request/claim-request.component';
import {OnlinePaymentComponent} from './online-payment/online-payment.component';
import {SubscriptionRequestComponent} from './subscription-request/subscription-request.component';
import {CancellationRequestsComponent} from './cancellation-requests/cancellation-requests.component';
import {NewCancellationRequestComponent} from './new-cancellation-request/new-cancellation-request.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'claim-request',
        component: ClaimRequestComponent,
        data: {
          title: 'Demandes de réclamation'
        }
      },
      {
        path: 'subscription-request',
        component: SubscriptionRequestComponent,
        data: {
          title: 'Demandes d\'abonnements'
        }
      },
      {
        path: 'cancellation-requests',
        component: CancellationRequestsComponent,
        data: {
          title: 'Demandes de résiliation'
        }
      },
      {
        path: 'new-cancellation-request',
        component: NewCancellationRequestComponent,
        data: {
          title: 'Nouvelle demande de résiliation'
        }
      },
      {
        path: 'cancellation-request',
        component: CancellationRequestComponent,
        data: {
          title: 'Demande de résiliation'
        }
      },
      {
        path: 'online-payment',
        component: OnlinePaymentComponent,
        data: {
          title: 'Paiement en ligne'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ServicesPagesRoutingModule {
}
