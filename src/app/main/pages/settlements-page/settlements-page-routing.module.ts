import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettlementsPageComponent} from './settlements-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SettlementsPageComponent,
        data: {
          title: 'Settlements Page'
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
export class SettlementsPageRoutingModule {
}
