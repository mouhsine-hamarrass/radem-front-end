import {Routes} from '@angular/router';

export const CONSUMPTION_ROUTES: Routes = [
  {
    path: 'consumptions',
    loadChildren: './main/pages/consumptions-page/consumptions-page.module#ConsumptionsPageModule'
  }
];
