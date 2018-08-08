import {Routes} from '@angular/router';

export const SERVICES_PAGES_ROUTES: Routes = [
  {
    path: 'services',
    loadChildren: './main/pages/services-pages/services-pages.module#ServicesPagesModule'
  }
];
