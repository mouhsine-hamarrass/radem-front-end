import {Routes} from '@angular/router';

export const TAX_PRINT_ROUTES: Routes = [
    {
        path: 'service-approach/tax-print',
        loadChildren: './main/pages/tax-print-page/tax-print-page.module#TaxPrintPageModule'
    }
];
