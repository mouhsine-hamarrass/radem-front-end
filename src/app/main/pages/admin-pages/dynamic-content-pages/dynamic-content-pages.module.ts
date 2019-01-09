import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdviceComponent} from './advice/advice.component';
import {AutoReportComponent} from './auto-report/auto-report.component';
import {CancellationRequestComponent} from './cancellation-request/cancellation-request.component';
import {ClaimRequestComponent} from './claim-request/claim-request.component';
import {ConsumptionComponent} from './consumption/consumption.component';
import {ContractComponent} from './contract/contract.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RegulationComponent} from './regulation/regulation.component';
import {SubscriptionRequestComponent} from './subscription-request/subscription-request.component';
import {UnpaidComponent} from './unpaid/unpaid.component';
import {DynamicContentPagesRoutingModule} from './dynamic-content-pages-routing.module';
import {SharedModule} from '../../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        DynamicContentPagesRoutingModule,
        SharedModule
    ],
    declarations: [AdviceComponent,
        AutoReportComponent,
        CancellationRequestComponent,
        ClaimRequestComponent,
        ConsumptionComponent,
        ContractComponent,
        DashboardComponent,
        RegulationComponent,
        SubscriptionRequestComponent,
        UnpaidComponent]
})
export class DynamicContentPagesModule {
}
