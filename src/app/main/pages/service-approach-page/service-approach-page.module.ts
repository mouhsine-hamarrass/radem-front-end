import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../app.translate.factory';
import {HttpClient} from '@angular/common/http';
import {NgxPermissionsModule} from 'ngx-permissions';
import {ServiceApproachPageComponent} from './service-approach-page.component';
import {ServiceApproachPageRoutingModule} from './service-approach-page-routing.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PipesModule,
        ServiceApproachPageRoutingModule,
        NgxPermissionsModule.forChild(),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    declarations: [ServiceApproachPageComponent]
})
export class ServiceApproachPageModule {
    constructor(private translate: TranslateService) {
        this.translate.use(localStorage['language']);
    }
}
