import {Routes} from '@angular/router';

export const REGISTER_ROUTES: Routes = [
  {
    path: 'register',
    loadChildren: './main/pages/register/register.module#RegisterModule'
  }
];
