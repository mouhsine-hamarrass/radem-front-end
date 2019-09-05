import {Routes} from '@angular/router';

export const TERMINATION_PRINT_ROUTES: Routes = [
    {
        path: 'service-approach/termination-print',
        loadChildren: './main/pages/termination-print-page/termination-print-page.module#TerminationPrintPageModule'
    }
];
