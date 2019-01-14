import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DynamicContentComponent} from './dynamic-content/dynamic-content.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dynamic',
                component: DynamicContentComponent,
                data: {
                    title: 'Contenu dynamique'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class DynamicContentPagesRoutingModule {
}
