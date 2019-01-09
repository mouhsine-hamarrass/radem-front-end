import {Routes} from '@angular/router';

export const ALERT_NOTIFICATIONS_ROUTES: Routes = [
  {
    path: 'alerts',
    loadChildren: './main/pages/alert-notifications-page/alert-notifications-page.module#AlertNotificationsPageModule'
  }
];
