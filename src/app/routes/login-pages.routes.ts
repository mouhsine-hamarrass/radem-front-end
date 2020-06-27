import {Routes} from '@angular/router';
import {ClientGuard} from '../core/guards/client.guard';

export const CONTRACTS_PAGE_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  }
];
