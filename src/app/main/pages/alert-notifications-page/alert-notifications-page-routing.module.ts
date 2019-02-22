import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlertNotificationsPageComponent} from './alert-notifications-page.component';
import {ProfileTypeEnum} from '../../../shared/models/user.model';
import {NgxPermissionsGuard} from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AlertNotificationsPageComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Alert notifications Page',
          permissions: {
            only: [ProfileTypeEnum.CLIENT],
            redirectTo: 'unauthorized'
          }
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AlertNotificationsPageRoutingModule {
}
