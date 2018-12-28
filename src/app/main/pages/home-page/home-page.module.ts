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

@NgModule({
    imports: [
        CommonModule,
        ChartsModule,
        BsDropdownModule,
        BsDatepickerModule,
        HomePageRoutingModule,
        PipesModule,
        UnpaidPageModule
    ],
    declarations: [HomePageComponent],
    providers: [
        HomeService,
        ProfileService
    ]
})
export class HomePageModule {
}
