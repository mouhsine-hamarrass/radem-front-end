import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlertNotificationsPageComponent} from './alert-notifications-page.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: AlertNotificationsPageComponent,
                data: {
                    title: 'Alert notifications Page'
                },
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: []
})
export class AlertNotificationsPageRoutingModule {
}
