import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractsPageComponent } from './contracts-page.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: ContractsPageComponent,
      data: {
        title: 'Liste des contrats'
      }
    }
  ]
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsPageRoutingModule { }
