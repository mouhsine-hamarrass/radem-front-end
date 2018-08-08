import {Routes} from '@angular/router';

export const ADMIN_PAGES_ROUTES: Routes = [
  {
    path: 'admin',
    loadChildren: './main/pages/admin-pages/admin-pages.module#AdminPagesModule'
  }
];
