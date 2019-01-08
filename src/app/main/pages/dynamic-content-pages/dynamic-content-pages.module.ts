import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SubscriptionRequestComponent} from './subscription-request/subscription-request.component';
import {CancellationRequestComponent} from './cancellation-request/cancellation-request.component';
import {AutoReportComponent} from './auto-report/auto-report.component';
import {ClaimRequestComponent} from './claim-request/claim-request.component';
import {ContractComponent} from './contract/contract.component';
import {UnpaidComponent} from './unpaid/unpaid.component';
import {ConsumptionComponent} from './consumption/consumption.component';
import {RegulationComponent} from './regulation/regulation.component';
import {SharedModule} from '../../../shared/shared.module';
import {DynamicContentPagesRoutingModule} from './dynamic-content-pages-routing.module';
import { AdviceComponent } from './advice/advice.component';

@NgModule({
    imports: [
        CommonModule,
        DynamicContentPagesRoutingModule,
        SharedModule
    ],
    declarations: [
        DashboardComponent,
        SubscriptionRequestComponent,
        CancellationRequestComponent,
        AutoReportComponent,
        ClaimRequestComponent,
        ContractComponent,
        UnpaidComponent,
        ConsumptionComponent,
        RegulationComponent,
        AdviceComponent
    ]
})
export class DynamicContentPagesModule {
}
