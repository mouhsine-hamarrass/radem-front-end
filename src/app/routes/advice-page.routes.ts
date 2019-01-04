import {Routes} from '@angular/router';

export const ADVICE_ROUTES: Routes = [
  {
    path: 'advice',
    loadChildren: './main/pages/advice-page/advice-page.module#AdvicePageModule'
  }
];
