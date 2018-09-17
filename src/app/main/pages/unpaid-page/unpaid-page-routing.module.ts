import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnpaidPageComponent} from './unpaid-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UnpaidPageComponent,
        data: {
          title: 'Unpaid Page'
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
export class UnpaidPageRoutingModule {
}
