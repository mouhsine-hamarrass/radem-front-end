import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvoicesPageComponent} from './invoices-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: InvoicesPageComponent,
        data: {
          title: 'Invoices Page'
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
export class InvoicesPageRoutingModule {
}
