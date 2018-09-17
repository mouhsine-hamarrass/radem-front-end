import {Routes} from '@angular/router';

export const UNPAID_PAGE_ROUTES: Routes = [
  {
    path: 'unpaid',
    loadChildren: './main/pages/unpaid-page/unpaid-page.module#UnpaidPageModule'
  }
];
