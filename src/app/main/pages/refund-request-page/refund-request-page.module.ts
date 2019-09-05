import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../app.translate.factory';
import {HttpClient} from '@angular/common/http';
import {NgxPermissionsModule} from 'ngx-permissions';
import {RefundRequestPageRoutingModule} from './refund-request-page-routing.module';
import {RefundRequestPageComponent} from './refund-request-page.component';
import {HelperService} from '../../services/helper.service';



@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PipesModule,
        RefundRequestPageRoutingModule,
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
    declarations: [RefundRequestPageComponent]
})
export class RefundRequestPageModule {
    constructor(private translate: TranslateService) {
        this.translate.use(localStorage['language']);
    }
}
