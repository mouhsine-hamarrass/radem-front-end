import {Routes} from '@angular/router';

export const PROVISIONAL_COUNTER_ROUTES: Routes = [
    {
        path: 'service-approach/provisional-counter',
        loadChildren: './main/pages/provisional-counter-page/provisional-counter-page.module#ProvisionalCounterPageModule'
    }
];
