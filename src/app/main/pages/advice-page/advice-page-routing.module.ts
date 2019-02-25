import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdvicePageComponent} from './advice-page.component';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {ProfileTypeEnum} from '../../../shared/models/user.model';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdvicePageComponent,
        // canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Advise Page',
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
export class AdvicePageRoutingModule {
}
