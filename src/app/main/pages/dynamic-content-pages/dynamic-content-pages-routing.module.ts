import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubscriptionRequestComponent} from './subscription-request/subscription-request.component';
import {CancellationRequestComponent} from './cancellation-request/cancellation-request.component';
import {ClaimRequestComponent} from './claim-request/claim-request.component';
import {AutoReportComponent} from './auto-report/auto-report.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ContractComponent} from './contract/contract.component';
import {UnpaidComponent} from './unpaid/unpaid.component';
import {RegulationComponent} from './regulation/regulation.component';
import {ConsumptionComponent} from './consumption/consumption.component';
import {AdviceComponent} from './advice/advice.component';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {ProfileTypeEnum} from '../../../shared/models/user.model';
import {InvoicesComponent} from './invoices/invoices.component';
import {RefundRequestComponent} from './refund-request/refund-request.component';
import {EmbranchmentRequestComponent} from './embranchment-request/embranchment-request.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: DashboardComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'tableau de bord',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'subscription-requests',
        component: SubscriptionRequestComponent,
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
        component: CancellationRequestComponent,
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
        path: 'embranchement-requests',
        component: EmbranchmentRequestComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Demandes de branchement',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'refund-requests',
        component: RefundRequestComponent,
        data: {
          title: 'Demandes de remboursement'
        }
      },
      {
        path: 'auto-reports',
        component: AutoReportComponent,
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
        path: 'claim-requests',
        component: ClaimRequestComponent,
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
        path: 'contracts',
        component: ContractComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Contrat',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Factures',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'unpaid',
        component: UnpaidComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Impayés',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'settlements',
        component: RegulationComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Règlement',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'consumptions',
        component: ConsumptionComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Consumption',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'advice',
        component: AdviceComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Advice',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DynamicContentPagesRoutingModule {
}
