import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProvisionalCounterPageComponent} from './provisional-counter-page.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ProvisionalCounterPageComponent,
                data: {
                    title: 'ProvisionalCounter Page'
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
export class ProvisionalCounterPageRoutingModule {
}
