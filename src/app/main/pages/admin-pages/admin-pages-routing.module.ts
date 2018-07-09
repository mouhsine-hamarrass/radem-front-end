import {NgModule} from '@angular/core';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {RouterModule, Routes} from '@angular/router';

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
