import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {AdvicePageRoutingModule} from './advice-page-routing.module';
import {AdvicePageComponent} from './advice-page.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../app.translate.factory';
import {HttpClient} from '@angular/common/http';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PipesModule,
        AdvicePageRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    declarations: [AdvicePageComponent]
})
export class AdvicePageModule {
    constructor(private translate: TranslateService) {
        this.translate.use(localStorage['language']);
    }
}
