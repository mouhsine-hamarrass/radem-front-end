import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsModule} from 'ng2-charts';
import {ContractsPageRoutingModule} from './contracts-page-routing.module';
import {ContractsPageComponent} from './contracts-page.component';
import {ContractsService} from '../../services/contracts.service';
import {ComponentsModule} from '../../../shared/components/components.module';
import {FormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BsDropdownModule,
        ContractsPageRoutingModule,
        ChartsModule,
        ComponentsModule,
        SharedModule
    ],
    declarations: [ContractsPageComponent],
    providers: [
        ContractsService
    ]
})
export class ContractsPageModule {
}
