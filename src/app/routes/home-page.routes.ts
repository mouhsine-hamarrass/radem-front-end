import {Routes} from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: 'home',
    loadChildren: './main/pages/home-page/home-page.module#HomePageModule'
  }
];
