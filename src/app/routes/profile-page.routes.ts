import {Routes} from '@angular/router';

export const PROFILE_PAGE_ROUTES: Routes = [
  {
    path: 'profile',
    loadChildren: './main/pages/profile-page/profile-page.module#ProfilePageModule'
  }
];
