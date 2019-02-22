import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CancellationRequestComponent} from './cancellation-request/cancellation-request.component';
import {ClaimRequestComponent} from './claim-request/claim-request.component';
import {OnlinePaymentComponent} from './online-payment/online-payment.component';
import {SubscriptionRequestsComponent} from './subscription-requests/subscription-requests.component';
import {CancellationRequestsComponent} from './cancellation-requests/cancellation-requests.component';
import {NewCancellationRequestComponent} from './new-cancellation-request/new-cancellation-request.component';
import {ClaimRequestsComponent} from './claim-requests/claim-requests.component';
import {ClaimDetailComponent} from './claim-detail/claim-detail.component';
import {PrintableCancellationComponent} from './printable-cancellation/printable-cancellation.component';
import {NewSubscriptionRequestComponent} from './new-subscription-request/new-subscription-request.component';
import {SubscriptionDetailComponent} from './subscription-detail/subscription-detail.component';
import {AutoReportsComponent} from './auto-reports/auto-reports.component';
import {ProfileTypeEnum} from '../../../shared/models/user.model';
import {NgxPermissionsGuard} from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'new-claim-request',
        component: ClaimRequestComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Nouvelle demande de réclamation',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'claim-requests',
        component: ClaimRequestsComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Demandes de réclamation',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'claim-request/:id',
        component: ClaimDetailComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Demandes de réclamation',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'subscription-requests',
        component: SubscriptionRequestsComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Demandes d\'abonnements',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'cancellation-requests',
        component: CancellationRequestsComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Demandes de résiliation',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'new-cancellation-request',
        component: NewCancellationRequestComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Nouvelle demande de résiliation',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'new-subscription-request',
        component: NewSubscriptionRequestComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Nouvelle demande d\'abonnement',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'cancellation-request/:id',
        component: CancellationRequestComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Demande de résiliation',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      /*
      {
          path: 'online-payment',
          component: OnlinePaymentComponent,
          data: {
              title: 'Paiement en ligne'
          }
      },
      */
      {
        path: 'auto-reports',
        component: AutoReportsComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Auto relève',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'subscription-detail/:id',
        component: SubscriptionDetailComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Demande d\'abonnement',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
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
