import {Routes} from '@angular/router';

export const REFUND_PRINT_ROUTES: Routes = [
    {
        path: 'service-approach/refund-print',
        loadChildren: './main/pages/refund-print-page/refund-print-page.module#RefundPrintPageModule'
    }
];
