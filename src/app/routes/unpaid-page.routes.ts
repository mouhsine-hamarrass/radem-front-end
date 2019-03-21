import {Routes} from '@angular/router';
import {ClientGuard} from '../core/guards/client.guard';

export const UNPAID_PAGE_ROUTES: Routes = [
  {
    path: 'unpaid',
    canActivate: [ClientGuard],
    loadChildren: './main/pages/unpaid-page/unpaid-page.module#UnpaidPageModule'
  }
];
