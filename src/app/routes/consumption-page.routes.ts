import {Routes} from '@angular/router';
import {AdminGuard} from '../core/guards/admin.guard';
import {ClientGuard} from '../core/guards/client.guard';

export const CONSUMPTION_ROUTES: Routes = [
  {
    path: 'consumptions',
    canActivate: [ClientGuard],
    loadChildren: './main/pages/consumptions-page/consumptions-page.module#ConsumptionsPageModule'
  }
];
