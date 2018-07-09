import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: {
      title: 'Home Page'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class HomePageRoutingModule {
}
