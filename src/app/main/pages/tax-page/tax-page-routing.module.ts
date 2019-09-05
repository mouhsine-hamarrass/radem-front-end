import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaxPageComponent} from './tax-page.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: TaxPageComponent,
                data: {
                    title: 'Tax Page'
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
export class TaxPageRoutingModule {
}
