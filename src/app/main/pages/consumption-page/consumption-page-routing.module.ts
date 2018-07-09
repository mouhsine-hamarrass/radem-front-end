import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConsumptionPageComponent} from './consumption-page.component';

const routes: Routes = [
  {
    path: '',
    component: ConsumptionPageComponent,
    data: {
      title: 'Consommation Page'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class ConsumptionPageRoutingModule { }
