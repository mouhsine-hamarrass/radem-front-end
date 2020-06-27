import {Routes} from '@angular/router';
import {AccountGuard} from '../core/guards/account-guard.service';

export const ACCOUNT_PAGES_ROUTES: Routes = [
  {
    path: 'account',
    canActivate: [AccountGuard],
    loadChildren: './main/pages/account-pages/account-pages.module#AccountPagesModule'
  }
];
