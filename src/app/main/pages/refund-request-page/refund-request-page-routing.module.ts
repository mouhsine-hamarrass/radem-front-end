import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RefundRequestPageComponent} from './refund-request-page.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: RefundRequestPageComponent,
                data: {
                    title: 'RefundRequest Page'
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
export class RefundRequestPageRoutingModule {
}
