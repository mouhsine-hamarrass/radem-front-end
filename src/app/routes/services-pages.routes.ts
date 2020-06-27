import {Routes} from '@angular/router';
import {ClientGuard} from '../core/guards/client.guard';

export const SERVICES_PAGES_ROUTES: Routes = [
  {
    path: 'services',
    canActivate: [ClientGuard],
    loadChildren: './main/pages/services-pages/services-pages.module#ServicesPagesModule'
  }
];
