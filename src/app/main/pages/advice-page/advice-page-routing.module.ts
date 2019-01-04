import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdvicePageComponent} from './advice-page.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: AdvicePageComponent,
                data: {
                    title: 'Advise Page'
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
export class AdvicePageRoutingModule {
}
