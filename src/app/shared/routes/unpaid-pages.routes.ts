import {Routes} from '@angular/router';

export const UNPAID_PAGES_ROUTES: Routes = [
  {
    path: 'unpaid',
    loadChildren: './main/pages/unpaid-pages/unpaid-pages.module#UnpaidPagesModule'
  }
];
