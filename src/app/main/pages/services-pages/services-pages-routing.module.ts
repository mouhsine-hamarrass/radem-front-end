import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CancellationRequestComponent} from './cancellation-request/cancellation-request.component';
import {ClaimRequestComponent} from './claim-request/claim-request.component';
import {OnlinePaymentComponent} from './online-payment/online-payment.component';
import {SubscriptionRequestComponent} from './subscription-request/subscription-request.component';
import {CancellationRequestsComponent} from './cancellation-requests/cancellation-requests.component';
import {NewCancellationRequestComponent} from './new-cancellation-request/new-cancellation-request.component';
import { ClaimRequestsComponent } from './claim-requests/claim-requests.component';
import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import { PrintableCancellationComponent } from './printable-cancellation/printable-cancellation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'new-claim-request',
        component: ClaimRequestComponent,
        data: {
          title: 'Nouvelle demande de réclamation'
        }
      },
      {
        path: 'claim-requests',
        component: ClaimRequestsComponent,
        data: {
          title: 'Demandes de réclamation'
        }
      },
      {
        path: 'claim-request/:id',
        component: ClaimDetailComponent,
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
        path: 'cancellation-request/:id',
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
      {
        path: 'print',
        component: PrintableCancellationComponent,
        data: {
          title: 'document'
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
