import {NgModule} from '@angular/core';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import { RequestsComponent } from './requests/requests.component';
import { ClaimsComponent } from './claims/claims.component';
import { CancellationRequestComponent } from './cancellation-request/cancellation-request.component';
import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import { AlertComponent } from './alert/alert.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './user/user.component';
import {ProfilesComponent} from './profiles/profiles.component';
import {ProfileComponent} from './profile/profile.component';

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
        path: 'alert',
        component: AlertComponent,
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
