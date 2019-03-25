import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page.component';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {ProfileTypeEnum} from '../../../shared/models/user.model';
import {ClientGuard} from '../../../core/guards/client.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [ClientGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class HomePageRoutingModule {
}
