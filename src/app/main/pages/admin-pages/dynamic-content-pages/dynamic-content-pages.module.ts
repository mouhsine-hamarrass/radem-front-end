import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicContentPagesRoutingModule} from './dynamic-content-pages-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../../app.translate.factory';
import {HttpClient} from '@angular/common/http';
import {DynamicContentComponent} from './dynamic-content/dynamic-content.component';

@NgModule({
    imports: [
        CommonModule,
        DynamicContentPagesRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        SharedModule
    ],
    declarations: [DynamicContentComponent]
})
export class DynamicContentPagesModule {
    constructor(private translate: TranslateService) {
        this.translate.use(localStorage['language']);
    }
}
