import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractsComponent } from './contracts/contracts.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'all-contracts',
      component: ContractsComponent,
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
export class ContractPagesRoutingModule { }
