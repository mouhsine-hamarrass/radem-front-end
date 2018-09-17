import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConsumptionsPageComponent} from './consumptions-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ConsumptionsPageComponent,
        data: {
          title: 'Consommation Page'
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
