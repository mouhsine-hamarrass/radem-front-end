import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../app.translate.factory';
import {HttpClient} from '@angular/common/http';
import {NgxPermissionsModule} from 'ngx-permissions';
import {HelperService} from '../../services/helper.service';
import {ProvisionalCounterPageRoutingModule} from './provisional-counter-page-routing.module';
import {ProvisionalCounterPageComponent} from './provisional-counter-page.component';



@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PipesModule,
        ProvisionalCounterPageRoutingModule,
        NgxPermissionsModule.forChild(),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [],
    declarations: [ProvisionalCounterPageComponent]
})
export class ProvisionalCounterPageModule {
    constructor(private translate: TranslateService) {
        this.translate.use(localStorage['language']);
    }
}
