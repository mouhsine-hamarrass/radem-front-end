import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CancellationRequestComponent} from './cancellation-request/cancellation-request.component';
import {ClaimRequestComponent} from './claim-request/claim-request.component';
import {OnlinePaymentComponent} from './online-payment/online-payment.component';
import {SubscriptionRequestsComponent} from './subscription-requests/subscription-requests.component';
import {CancellationRequestsComponent} from './cancellation-requests/cancellation-requests.component';
import {NewCancellationRequestComponent} from './new-cancellation-request/new-cancellation-request.component';
import { ClaimRequestsComponent } from './claim-requests/claim-requests.component';
import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import { PrintableCancellationComponent } from './printable-cancellation/printable-cancellation.component';
import { NewSubscriptionRequestComponent } from './new-subscription-request/new-subscription-request.component';
import { SubscriptionDetailComponent } from './subscription-detail/subscription-detail.component';

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
        path: 'subscription-requests',
        component: SubscriptionRequestsComponent,
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
        path: 'new-subscription-request',
        component: NewSubscriptionRequestComponent,
        data: {
          title: 'Nouvelle demande d\'abonnement'
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
        path: 'subscription-detail/:id',
        component: SubscriptionDetailComponent,
        data: {
          title: 'Demande d\'abonnement'
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
