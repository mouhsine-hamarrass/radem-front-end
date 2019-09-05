import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TerminationPageComponent} from './termination-page.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: TerminationPageComponent,
                data: {
                    title: 'Termination Page'
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
export class TerminationPageRoutingModule {
}
