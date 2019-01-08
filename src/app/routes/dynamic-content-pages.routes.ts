import {Routes} from '@angular/router';

export const DYNAMIC_CONTENT_PAGES_ROUTES: Routes = [
  {
    path: 'advices',
    loadChildren: './main/pages/dynamic-content-pages/dynamic-content-pages.module#DynamicContentPagesModule'
  }
];
