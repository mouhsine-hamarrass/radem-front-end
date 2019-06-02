import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '../../../shared/components/components.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {SettlementsPageComponent} from './settlements-page.component';
import {SettlementsPageRoutingModule} from './settlements-page-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap';
import {SharedModule} from '../../../shared/shared.module';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../app.translate.factory';
import {HttpClient} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SettlementsPageRoutingModule,
        AngularFontAwesomeModule,
        ComponentsModule,
        BsDropdownModule,
        ReactiveFormsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        SharedModule
    ],
    exports: [
        SettlementsPageComponent,
        SettlementsPageComponent
    ],
    declarations: [
        SettlementsPageComponent
    ]
})
export class SettlementsPageModule {
    constructor(private translate: TranslateService) {
        this.translate.use(localStorage['language']);
    }
}
