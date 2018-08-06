import {Routes} from '@angular/router';

export const CONSUMPTION_ROUTES: Routes = [
  {
    path: 'consumption',
    loadChildren: './main/pages/consumption-page/consumption-page.module#ConsumptionPageModule'
  }
];
