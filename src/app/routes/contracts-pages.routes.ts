import {Routes} from '@angular/router';

export const CONTRACT_PAGES_ROUTES: Routes = [
  {
    path: 'contracts',
    loadChildren: './main/pages/contract-pages/contract-pages.module#ContractPagesModule'
  }
];
