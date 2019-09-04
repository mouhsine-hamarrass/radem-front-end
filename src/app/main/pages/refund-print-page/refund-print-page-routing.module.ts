import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RefundPrintPageComponent} from './refund-print-page.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: RefundPrintPageComponent,
                data: {
                    title: 'RefundPrint Page'
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
export class RefundPrintPageRoutingModule {
}
