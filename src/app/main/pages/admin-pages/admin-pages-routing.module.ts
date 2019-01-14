import {NgModule} from '@angular/core';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {RequestsComponent} from './requests/requests.component';
import {CancellationRequestComponent} from './cancellation-request/cancellation-request.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './user/user.component';
import {ProfilesComponent} from './profiles/profiles.component';
import {ProfileComponent} from './profile/profile.component';
import {SettingsComponent} from './settings/settings.component';
import {SubscriptionDetailComponent} from './subscription-detail/subscription-detail.component';
import {AdvicesComponent} from './advices/advices.component';
import {ServicesComponent} from './services/services.component';
import {AlertNotificationComponent} from './alert-notification/alert-notification.component';
import {AlertsComponent} from './alerts/alerts.component';
import {AlertNotificationsComponent} from './alert-notifications/alert-notifications.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {ComplaintComponent} from './complaint/complaint.component';
import {DynamicContentComponent} from './dynamic-content/dynamic-content.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
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
                path: 'complaints',
                component: ComplaintsComponent,
                data: {
                    title: 'Liste des réclamations'
                }
            },
            {
                path: 'complaints/:id',
                component: ComplaintComponent,
                data: {
                    title: 'Réclamation'
                }
            },
            {
                path: 'requests/:id',
                component: CancellationRequestComponent,
                data: {
                    title: 'Demande de résiliation'
                }
            },
            {
                path: 'subscriptions/:id',
                component: SubscriptionDetailComponent,
                data: {
                    title: 'Abonnement'
                }
            },
            {
                path: 'alert-notifications/:id',
                component: AlertNotificationComponent,
                data: {
                    title: 'Alerte'
                }
            },
            {
                path: 'alert-notification',
                component: AlertNotificationComponent,
                data: {
                    title: 'Alerte'
                }
            },
            {
                path: 'profiles',
                component: ProfilesComponent,
                data: {
                    title: 'Profils'
                }
            },
            {
                path: 'profile',
                component: ProfileComponent,
                data: {
                    title: 'Nouveau profil'
                }
            },
            {
                path: 'profiles/:id',
                component: ProfileComponent,
                data: {
                    title: 'Editer profil'
                }
            },
            {
                path: 'users',
                component: UsersComponent,
                data: {
                    title: 'Utilisateurs'
                }
            },
            {
                path: 'user',
                component: UserComponent,
                data: {
                    title: 'Nouveau utilisateur'
                }
            },
            {
                path: 'users/:id',
                component: UserComponent,
                data: {
                    title: 'Editer utilisateur'
                }
            },
            {
                path: 'alerts',
                component: AlertsComponent,
                data: {
                    title: 'Liste des alertes'
                }
            },
            {
                path: 'settings',
                component: SettingsComponent,
                data: {
                    title: 'Parametrage'
                }
            },
            {
                path: 'advices',
                component: AdvicesComponent,
                data: {
                    title: 'Conseil et économie d\'énergie'
                }
            },
            {
                path: 'dynamic',
                component: DynamicContentComponent,
                data: {
                    title: 'Contenu dynamique'
                }
            },
            {
                path: 'services',
                component: ServicesComponent,
                data: {
                    title: 'Services'
                }
            },
            {
                path: 'alert-notifications',
                component: AlertNotificationsComponent,
                data: {
                    title: 'Liste des alertes'
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
