import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CounterPrintPageComponent} from './counter-print-page.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: CounterPrintPageComponent,
                data: {
                    title: 'CounterPrint Page'
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
export class CounterPrintPageRoutingModule {
}
