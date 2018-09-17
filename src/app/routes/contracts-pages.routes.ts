import {Routes} from '@angular/router';

export const CONTRACTS_PAGE_ROUTES: Routes = [
  {
    path: 'contracts',
    loadChildren: './main/pages/contracts-page/contracts-page.module#ContractsPageModule'
  }
];
