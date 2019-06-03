import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClaimRequestComponent} from './claim-request/claim-request.component';
import {SubscriptionRequestsComponent} from './subscription-requests/subscription-requests.component';
import {CancellationRequestComponent} from './cancellation-request/cancellation-request.component';
import {OnlinePaymentComponent} from './online-payment/online-payment.component';
import {ServicesPagesRoutingModule} from './services-pages-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CancellationRequestsComponent} from './cancellation-requests/cancellation-requests.component';
import {NewCancellationRequestComponent} from './new-cancellation-request/new-cancellation-request.component';
import {ClaimRequestsComponent} from './claim-requests/claim-requests.component';
import {ClaimDetailComponent} from './claim-detail/claim-detail.component';
import {PrintableCancellationComponent} from './printable-cancellation/printable-cancellation.component';
import {NewSubscriptionRequestComponent} from './new-subscription-request/new-subscription-request.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../app.translate.factory';
import {SubscriptionDetailComponent} from './subscription-detail/subscription-detail.component';
import {ArchwizardModule} from 'angular-archwizard';
import {ComponentsModule} from '../../../shared/components/components.module';
import {SharedModule} from '../../../shared/shared.module';
import {HttpClient} from '@angular/common/http';
import { AutoReportsComponent } from './auto-reports/auto-reports.component';
import {CancellationDetailComponent} from './cancellation-detail/cancellation-detail.component';
import {RefundRequestsComponent} from './refund-requests/refund-requests.component';
import {NewRefundRequestComponent} from './new-refund-request/new-refund-request.component';
import {RefundDetailComponent} from './refund-detail/refund-detail.component';
import {EmbranchmentRequestsComponent} from './embranchment-requests/embranchment-requests.component';
import {NewEmbranchementRequestComponent} from './new-embranchement-request/new-embranchement-request.component';
import {EmbranchmentDetailComponent} from './embranchment-detail/embranchment-detail.component';
import {PaymentSuccessComponent} from './payment-success/payment-success.component';
import { PaymentFailComponent } from './payment-fail/payment-fail.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import {TooltipModule} from 'ngx-bootstrap';
@NgModule({
    imports: [
        CommonModule,
        ServicesPagesRoutingModule,
        ArchwizardModule,
        TooltipModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
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
        ClaimRequestComponent,
        SubscriptionRequestsComponent,
        RefundRequestsComponent,
        CancellationRequestComponent,
        CancellationRequestsComponent,
        NewCancellationRequestComponent,
        OnlinePaymentComponent,
        ClaimRequestsComponent,
        NewRefundRequestComponent,
        RefundDetailComponent,
        ClaimDetailComponent,
        EmbranchmentRequestsComponent,
        CancellationDetailComponent,
        PrintableCancellationComponent,
        NewSubscriptionRequestComponent,
        SubscriptionDetailComponent,
        AutoReportsComponent,
        NewEmbranchementRequestComponent,
        EmbranchmentDetailComponent,
        PaymentSuccessComponent,
        PaymentFailComponent,
        PaymentStatusComponent
    ]
})
export class ServicesPagesModule {
    constructor(private translate: TranslateService) {
        this.translate.use(localStorage['language']);
    }
}
