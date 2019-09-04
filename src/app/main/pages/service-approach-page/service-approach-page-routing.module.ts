import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {ProfileTypeEnum} from '../../../shared/models/user.model';
import {ServiceApproachPageComponent} from './service-approach-page.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ServiceApproachPageComponent,
                // canActivate: [NgxPermissionsGuard],
                data: {
                    title: 'ServiceApproach Page',

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
export class ServiceApproachPageRoutingModule {
}
