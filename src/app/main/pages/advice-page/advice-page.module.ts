import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {AdvicePageRoutingModule} from './advice-page-routing.module';
import {AdvicePageComponent} from './advice-page.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PipesModule,
        AdvicePageRoutingModule
    ],
    declarations: [AdvicePageComponent]
})
export class AdvicePageModule {
}
