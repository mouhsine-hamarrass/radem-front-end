import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page.component';
import {HomePageRoutingModule} from './home-page-routing.module';
import {ChartsModule} from 'ng2-charts';
import {BsDatepickerConfig, BsDatepickerModule, BsDropdownModule} from 'ngx-bootstrap';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {HomeService} from '../../services/home.service';
import {ProfileService} from '../../services/profile.service';
import {UnpaidPageModule} from '../unpaid-page/unpaid-page.module';
import {SharedModule} from '../../../shared/shared.module';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {createTranslateLoader} from '../../../app.translate.factory';
import {ConsumptionsPageModule} from '../consumptions-page/consumptions-page.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartsModule,
        BsDropdownModule,
        BsDatepickerModule,
        HomePageRoutingModule,
        PipesModule,
        UnpaidPageModule,
        ConsumptionsPageModule,
        SharedModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    declarations: [HomePageComponent],
    providers: [
        HomeService,
        ProfileService
    ]
})
export class HomePageModule {
    constructor(private translate: TranslateService) {
        this.translate.use(localStorage['language']);
    }
}
