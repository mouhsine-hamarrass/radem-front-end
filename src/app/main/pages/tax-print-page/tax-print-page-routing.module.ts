import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaxPrintPageComponent} from './tax-print-page.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: TaxPrintPageComponent,
                data: {
                    title: 'TaxPrint Page'
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
export class TaxPrintPageRoutingModule {
}
