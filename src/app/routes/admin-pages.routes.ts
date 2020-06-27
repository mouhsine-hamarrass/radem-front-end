import {Routes} from '@angular/router';
import {AdminGuard} from '../core/guards/admin.guard';

export const ADMIN_PAGES_ROUTES: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: './main/pages/admin-pages/admin-pages.module#AdminPagesModule'
  }
];
