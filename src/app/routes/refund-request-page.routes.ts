import {Routes} from '@angular/router';

export const REFUND_REQUEST_ROUTES: Routes = [
    {
        path: 'refund-request-page',
        loadChildren: './main/pages/refund-request-page/refund-request-page.module#RefundRequestPageModule'
    }
];
