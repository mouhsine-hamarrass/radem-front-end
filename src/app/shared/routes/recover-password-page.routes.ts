import {Routes} from '@angular/router';

export const RECOVER_PASSWORD_ROUTES: Routes = [
  {
    path: 'recover-password',
    loadChildren: './main/pages/recover-password/recover-password.module#RecoverPasswordModule'
  }
];
