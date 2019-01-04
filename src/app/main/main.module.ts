import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServicesService} from './services/services.service';
import {AdminPagesModule} from './pages/admin-pages/admin-pages.module';
import {ConsumptionsPageModule} from './pages/consumptions-page/consumptions-page.module';
import {ContractsPageModule} from './pages/contracts-page/contracts-page.module';
import {HomePageModule} from './pages/home-page/home-page.module';
import {ServicesPagesModule} from './pages/services-pages/services-pages.module';
import {UtilsService} from './services/utils.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {createTranslateLoader} from '../app.translate.factory';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SettlementsPageModule} from './pages/settlements-page/settlements-page.module';
import {UnpaidPageModule} from './pages/unpaid-page/unpaid-page.module';
import {ComplaintService} from './services/complaint.service';
import {DirectivesModule} from '../shared/directives/directives.module';
import {OWL_DATE_TIME_FORMATS} from 'ng-pick-datetime';
import {MY_MOMENT_FORMATS} from '../shared/shared.module';
import {AdvicePageModule} from './pages/advice-page/advice-page.module';

@NgModule({
    imports: [
        CommonModule,
        AdminPagesModule,
        BrowserAnimationsModule,
        ConsumptionsPageModule,
        ContractsPageModule,
        HomePageModule,
        ServicesPagesModule,
        SettlementsPageModule,
        UnpaidPageModule,
        DirectivesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        ServicesService,
        UtilsService,
        ComplaintService,
        {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS}
    ],
    declarations: [],
    exports: [
        AdminPagesModule,
        ConsumptionsPageModule,
        ContractsPageModule,
        HomePageModule,
        ServicesPagesModule,
        SettlementsPageModule,
        UnpaidPageModule,
        AdvicePageModule
    ]
})
export class MainModule {
}
