import {NgModule} from '@angular/core';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import { RequestsComponent } from './requests/requests.component';
import { ClaimsComponent } from './claims/claims.component';
import { CancellationRequestComponent } from './cancellation-request/cancellation-request.component';
import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import { AlertComponent } from './alert/alert.component';
import { SubscriptionDetailComponent } from './subscription-detail/subscription-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        data: {
          title: 'Tableau de bord'
        }
      },
      {
        path: 'requests',
        component: RequestsComponent,
        data: {
          title: 'Liste des demandes'
        }
      },
      {
        path: 'claims',
        component: ClaimsComponent,
        data: {
          title: 'Liste des réclamations'
        }
      },
      {
        path: 'request/:id',
        component: CancellationRequestComponent,
        data: {
          title: 'Demande de résiliation'
        }
      },
      {
        path: 'claim/:id',
        component: ClaimDetailComponent,
        data: {
          title: 'Réclamation'
        }
      },
      {
        path: 'subscription/:id',
        component: SubscriptionDetailComponent,
        data: {
          title: 'Abonnement'
        }
      },
      {
        path: 'alert',
        component: AlertComponent,
        data: {
          title: 'Alerte'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagesRoutingModule {
}
