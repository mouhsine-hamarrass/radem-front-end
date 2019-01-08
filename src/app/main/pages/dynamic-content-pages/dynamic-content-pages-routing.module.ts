import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubscriptionRequestComponent} from './subscription-request/subscription-request.component';
import {CancellationRequestComponent} from './cancellation-request/cancellation-request.component';
import {ClaimRequestComponent} from './claim-request/claim-request.component';
import {AutoReportComponent} from './auto-report/auto-report.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ContractComponent} from './contract/contract.component';
import {UnpaidComponent} from './unpaid/unpaid.component';
import {RegulationComponent} from './regulation/regulation.component';
import {ConsumptionComponent} from './consumption/consumption.component';
import {AdviceComponent} from './advice/advice.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'home',
                component: DashboardComponent,
                data: {
                    title: 'tableau de bord'
                }
            },
            {
                path: 'subscription-requests',
                component: SubscriptionRequestComponent,
                data: {
                    title: 'Demandes d\'abonnements'
                }
            },
            {
                path: 'cancellation-requests',
                component: CancellationRequestComponent,
                data: {
                    title: 'Demandes de résiliation'
                }
            },
            {
                path: 'auto-reports',
                component: AutoReportComponent,
                data: {
                    title: 'Auto relève'
                }
            },
            {
                path: 'claim-requests',
                component: ClaimRequestComponent,
                data: {
                    title: 'Demandes de réclamation'
                }
            },
            {
                path: 'contracts',
                component: ContractComponent,
                data: {
                    title: 'Contrat'
                }
            },
            {
                path: 'unpaid',
                component: UnpaidComponent,
                data: {
                    title: 'Impayés'
                }
            },
            {
                path: 'settlements',
                component: RegulationComponent,
                data: {
                    title: 'Règlement'
                }
            },
            {
                path: 'consumptions',
                component: ConsumptionComponent,
                data: {
                    title: 'Consumption'
                }
            },
            {
                path: 'advice',
                component: AdviceComponent,
                data: {
                    title: 'Advice'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class DynamicContentPagesRoutingModule {
}
