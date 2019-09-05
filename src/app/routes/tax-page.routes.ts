import {Routes} from '@angular/router';

export const TAX_ROUTES: Routes = [
    {
        path: 'service-approach/tax-page',
        loadChildren: './main/pages/tax-page/tax-page.module#TaxPageModule'
    }
];
