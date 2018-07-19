import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnpaidComponent } from '../account-pages/unpaid/unpaid.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'unpaid-bills',
        component: UnpaidComponent,
        data: {
          title: 'Liste des factures à payer'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnpaidPagesRoutingModule { }
