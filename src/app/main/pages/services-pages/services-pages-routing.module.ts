import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClaimRequestComponent} from './claim-request/claim-request.component';
import {SubscriptionRequestsComponent} from './subscription-requests/subscription-requests.component';
import {CancellationRequestsComponent} from './cancellation-requests/cancellation-requests.component';
import {NewCancellationRequestComponent} from './new-cancellation-request/new-cancellation-request.component';
import {ClaimRequestsComponent} from './claim-requests/claim-requests.component';
import {ClaimDetailComponent} from './claim-detail/claim-detail.component';
import {NewSubscriptionRequestComponent} from './new-subscription-request/new-subscription-request.component';
import {SubscriptionDetailComponent} from './subscription-detail/subscription-detail.component';
import {AutoReportsComponent} from './auto-reports/auto-reports.component';
import {CancellationRequestComponent} from './cancellation-request/cancellation-request.component';
import {CancellationDetailComponent} from './cancellation-detail/cancellation-detail.component';
import {OnlinePaymentComponent} from './online-payment/online-payment.component';
import {RefundRequestsComponent} from './refund-requests/refund-requests.component';
import {NewRefundRequestComponent} from './new-refund-request/new-refund-request.component';
import {RefundDetailComponent} from './refund-detail/refund-detail.component';
import {EmbranchmentRequestsComponent} from './embranchment-requests/embranchment-requests.component';
import {NewEmbranchementRequestComponent} from './new-embranchement-request/new-embranchement-request.component';
import {EmbranchmentDetailComponent} from './embranchment-detail/embranchment-detail.component';
import {PaymentSuccessComponent} from './payment-success/payment-success.component';
import {PaymentFailComponent} from './payment-fail/payment-fail.component';
import {PaymentStatusComponent} from './payment-status/payment-status.component';

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
        path: 'cancellation-detail/:id',
        component: CancellationDetailComponent,
        data: {
          title: 'Demandes de résiliation'
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
        path: 'payment',
        component: OnlinePaymentComponent,
        data: {
          title: 'Paiement en ligne'
        }
      },
      {
        path: 'auto-reports',
        component: AutoReportsComponent,
        data: {
          title: 'Auto relève'
        }
      },
      {
        path: 'subscription-detail/:id',
        component: SubscriptionDetailComponent,
        data: {
          title: 'Demande d\'abonnement'
        }
      },

      {
        path: 'refund-requests',
        component: RefundRequestsComponent,
        data: {
          title: 'Demande de remboursement'
        }
      },
      {
        path: 'new-refund-request',
        component: NewRefundRequestComponent,
        data: {
          title: 'Nouvelle demande de remboursement'
        }
      },

      {
        path: 'refund-detail/:id',
        component: RefundDetailComponent,
        data: {
          title: 'Nouvelle demande de remboursement'
        }
      },

      {
        path: 'embranchement-requests',
        component: EmbranchmentRequestsComponent,
        data: {
          title: 'Demande de branchement'
        }
      },
      {
        path: 'new-embranchement-request',
        component: NewEmbranchementRequestComponent,
        data: {
          title: 'Nouvelle demande de branchement'
        }
      },
      {
        path: 'embranchment-detail/:id',
        component: EmbranchmentDetailComponent,
        data: {
          title: 'demande de remboursement'
        }
      },
      {
        path: 'paiement/success/:id',
        component: PaymentSuccessComponent,
        data: {
          title: 'paiement reussi'
        }
      },
      {
        path: 'paiement/fail/:id',
        component: PaymentFailComponent,
        data: {
          title: 'paiement echoue'
        }
      },
      {
        path: 'payment/status/:id',
        component: PaymentStatusComponent,
        data: {
          title: 'etat paiement'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ServicesPagesRoutingModule {
}
