import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TerminationPrintPageComponent} from './termination-print-page.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: TerminationPrintPageComponent,
                data: {
                    title: 'TerminationPrint Page'
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
export class TerminationPrintPageRoutingModule {
}
