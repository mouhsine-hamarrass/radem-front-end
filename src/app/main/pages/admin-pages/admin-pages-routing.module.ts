import {NgModule} from '@angular/core';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './user/user.component';
import {ProfilesComponent} from './profiles/profiles.component';
import {ProfileComponent} from './profile/profile.component';
import {SettingsComponent} from './settings/settings.component';
import {AdvicesComponent} from './advices/advices.component';
import {ServicesComponent} from './services/services.component';
import {AlertNotificationComponent} from './alert-notification/alert-notification.component';
import {AlertsComponent} from './alerts/alerts.component';
import {AlertNotificationsComponent} from './alert-notifications/alert-notifications.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {ComplaintComponent} from './complaint/complaint.component';
import {DynamicContentComponent} from './dynamic-content/dynamic-content.component';
import {RequestsSubscriptionComponent} from './requests-subscription/requests-subscription.component';
import {RequestsRefundComponent} from './requests-refund/requests-refund.component';
import {RequestsCancellationComponent} from './requests-cancellation/requests-cancellation.component';
import {RequestSubscriptionDetailComponent} from './request-subscription-detail/request-subscription-detail.component';
import {RequestCancellationDetailComponent} from './request-cancellation-detail/request-cancellation-detail.component';
import {RequestRefundDetailComponent} from './request-refund-detail/request-refund-detail.component';
import {ProfileTypeEnum} from '../../../shared/models/user.model';
import {NgxPermissionsGuard} from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Tableau de bord',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'requests-subscription',
        component: RequestsSubscriptionComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Liste des demandes abonnements',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'requests-cancellation',
        // canActivate: [NgxPermissionsGuard],
        component: RequestsCancellationComponent,
        data: {
          title: 'Liste des demandes résiliations',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'requests-refund',
        component: RequestsRefundComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Liste des demandes remboursement',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'complaints',
        // canActivate: [NgxPermissionsGuard],
        component: ComplaintsComponent,
        data: {
          title: 'Liste des réclamations',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'complaints/:id',
        // canActivate: [NgxPermissionsGuard],
        component: ComplaintComponent,
        data: {
          title: 'Réclamation',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },

      {
        path: 'detail-subscription/:id',
        // canActivate: [NgxPermissionsGuard],
        component: RequestSubscriptionDetailComponent,
        data: {
          title: 'Demande d\'abonnement',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'detail-cancellation/:id',
        // canActivate: [NgxPermissionsGuard],
        component: RequestCancellationDetailComponent,
        data: {
          title: 'Demande de résiliation',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'detail-remboursement/:id',
        // canActivate: [NgxPermissionsGuard],
        component: RequestRefundDetailComponent,
        data: {
          title: 'Demande de remboursement',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'alert-notifications/:id',
        // canActivate: [NgxPermissionsGuard],
        component: AlertNotificationComponent,
        data: {
          title: 'Alerte',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'alert-notification',
        // canActivate: [NgxPermissionsGuard],
        component: AlertNotificationComponent,
        data: {
          title: 'Alerte',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'profiles',
        // canActivate: [NgxPermissionsGuard],
        component: ProfilesComponent,
        data: {
          title: 'Profils',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'profile',
        // canActivate: [NgxPermissionsGuard],
        component: ProfileComponent,
        data: {
          title: 'Nouveau profil',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'profiles/:id',
        // canActivate: [NgxPermissionsGuard],
        component: ProfileComponent,
        data: {
          title: 'Editer profil',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'users',
        // canActivate: [NgxPermissionsGuard],
        component: UsersComponent,
        data: {
          title: 'Utilisateurs',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'user',
        // canActivate: [NgxPermissionsGuard],
        component: UserComponent,
        data: {
          title: 'Nouveau utilisateur',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'users/:id',
        // canActivate: [NgxPermissionsGuard],
        component: UserComponent,
        data: {
          title: 'Editer utilisateur',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'alerts',
        // canActivate: [NgxPermissionsGuard],
        component: AlertsComponent,
        data: {
          title: 'Liste des alertes',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'settings',
        // canActivate: [NgxPermissionsGuard],
        component: SettingsComponent,
        data: {
          title: 'Parametrage',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'advices',
        // canActivate: [NgxPermissionsGuard],
        component: AdvicesComponent,
        data: {
          title: 'Conseil et économie d\'énergie',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'dynamic',
        // canActivate: [NgxPermissionsGuard],
        component: DynamicContentComponent,
        data: {
          title: 'Contenu dynamique',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'services',
        // canActivate: [NgxPermissionsGuard],
        component: ServicesComponent,
        data: {
          title: 'Services',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
            redirectTo: 'unauthorized'
          }
        }
      },
      {
        path: 'alert-notifications',
        // canActivate: [NgxPermissionsGuard],
        component: AlertNotificationsComponent,
        data: {
          title: 'Liste des alertes',
          permissions: {
            only: [ProfileTypeEnum.ADMIN],
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
export class AdminPagesRoutingModule {
}
