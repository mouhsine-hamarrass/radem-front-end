import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContractsPageComponent} from './contracts-page.component';
import {ProfileTypeEnum} from '../../../shared/models/user.model';
import {NgxPermissionsGuard} from 'ngx-permissions';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: ContractsPageComponent,
      // canActivate: [NgxPermissionsGuard],
      data: {
        title: 'Liste des contrats',
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
  exports: [RouterModule]
})
export class ContractsPageRoutingModule {
}
