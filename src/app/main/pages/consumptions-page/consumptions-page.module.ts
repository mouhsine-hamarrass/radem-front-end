import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsumptionsPageComponent} from './consumptions-page.component';
import {ConsumptionsPageRoutingModule} from './consumptions-page-routing.module';
import {AdminService} from '../../services/admin.service';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {BsDropdownModule} from 'ngx-bootstrap';
import {ComponentsModule} from '../../../shared/components/components.module';
import {SharedModule} from '../../../shared/shared.module';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../app.translate.factory';
import {HttpClient} from '@angular/common/http';
import {ConsumptionsTableComponent} from './consumptions-table/consumptions-table.component';

@NgModule({
    imports: [
        CommonModule,
        ConsumptionsPageRoutingModule,
        AngularFontAwesomeModule,
        SharedModule,
        BsDropdownModule,
        ComponentsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    declarations: [ConsumptionsPageComponent, ConsumptionsTableComponent],
    providers: [AdminService],
    exports: [ConsumptionsTableComponent]
})
export class ConsumptionsPageModule {
    constructor(private translate: TranslateService) {
        this.translate.use(localStorage['language']);
    }
}
