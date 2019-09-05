import {Routes} from '@angular/router';

export const SERVICE_APPROACH_ROUTES: Routes = [
    {
        path: 'service-approach',
        loadChildren: './main/pages/service-approach-page/service-approach-page.module#ServiceApproachPageModule'
    }
];
