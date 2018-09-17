import {Routes} from '@angular/router';

export const SETTLEMENTS_PAGES_ROUTES: Routes = [
  {
    path: 'settlements',
    loadChildren: './main/pages/settlements-page/settlements-page.module#SettlementsPageModule'
  }
];
