import {Routes} from '@angular/router';
import {ClientGuard} from '../core/guards/client.guard';

export const CONTRACTS_PAGE_ROUTES: Routes = [
  {
    path: 'contracts',
    canActivate: [ClientGuard],
    loadChildren: './main/pages/contracts-page/contracts-page.module#ContractsPageModule'
  }
];
