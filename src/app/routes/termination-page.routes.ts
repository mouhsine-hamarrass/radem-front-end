import {Routes} from '@angular/router';

export const TERMINATION_ROUTES: Routes = [
    {
        path: 'service-approach/termination-page',
        loadChildren: './main/pages/termination-page/termination-page.module#TerminationPageModule'
    }
];
