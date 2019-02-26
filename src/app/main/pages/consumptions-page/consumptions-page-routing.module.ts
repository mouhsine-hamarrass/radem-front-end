import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConsumptionsPageComponent} from './consumptions-page.component';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {ProfileTypeEnum} from '../../../shared/models/user.model';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ConsumptionsPageComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Consommation Page',
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
export class ConsumptionsPageRoutingModule { }
