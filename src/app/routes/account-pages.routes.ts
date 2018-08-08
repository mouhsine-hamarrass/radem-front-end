import {Routes} from '@angular/router';

export const ACCOUNT_PAGES_ROUTES: Routes = [
  {
    path: 'account',
    loadChildren: './main/pages/account-pages/account-pages.module#AccountPagesModule'
  }
];
