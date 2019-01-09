import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '../../../shared/components/components.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {UnpaidPageComponent} from './unpaid-page.component';
import {UnpaidPageRoutingModule} from './unpaid-page-routing.module';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import { UnpaidTableComponent } from './unpaid-table/unpaid-table.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../app.translate.factory';
import {HttpClient} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UnpaidPageRoutingModule,
        AngularFontAwesomeModule,
        ComponentsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        SharedModule
    ],
    declarations: [
        UnpaidPageComponent,
        UnpaidTableComponent
    ],
    exports: [UnpaidTableComponent]
})
export class UnpaidPageModule {
    constructor(private translate: TranslateService) {
        this.translate.use(localStorage['language']);
    }
}
