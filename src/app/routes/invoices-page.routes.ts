import {Routes} from '@angular/router';
import {ClientGuard} from '../core/guards/client.guard';

export const INVOICE_PAGE_ROUTES: Routes = [
  {
    path: 'invoices',
    canActivate: [ClientGuard],
    loadChildren: './main/pages/invoices-page/invoices-page.module#InvoicesPageModule'
  }
];
