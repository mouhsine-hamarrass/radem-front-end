import {Routes} from '@angular/router';
import {ClientGuard} from '../core/guards/client.guard';

export const SETTLEMENTS_PAGES_ROUTES: Routes = [
  {
    path: 'settlements',
    canActivate: [ClientGuard],
    loadChildren: './main/pages/settlements-page/settlements-page.module#SettlementsPageModule'
  }
];
