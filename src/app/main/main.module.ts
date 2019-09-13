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
import {DynamicContentPagesModule} from './pages/dynamic-content-pages/dynamic-content-pages.module';
import {AlertNotificationsPageModule} from './pages/alert-notifications-page/alert-notifications-page.module';
import {CommonService} from './services/common.service';
import {TooltipModule} from 'ngx-bootstrap';
import {ServiceApproachPageModule} from './pages/service-approach-page/service-approach-page.module';
import {RefundRequestPageModule} from './pages/refund-request-page/refund-request-page.module';
import {RefundPrintPageModule} from './pages/refund-print-page/refund-print-page.module';
import {CounterPrintPageModule} from './pages/counter-print-page/counter-print-page.module';
import {ProvisionalCounterPageModule} from './pages/provisional-counter-page/provisional-counter-page.module';
import {TaxPageModule} from './pages/tax-page/tax-page.module';
import {TaxPrintPageModule} from './pages/tax-print-page/tax-print-page.module';
import {TerminationPageModule} from './pages/termination-page/termination-page.module';
import {TerminationPrintPageModule} from './pages/termination-print-page/termination-print-page.module';
import {HelperService} from './services/helper.service';
import {PaymentHelperService} from './services/payment-helper.service';

@NgModule({
  imports: [
    CommonModule,
    AdminPagesModule,
    BrowserAnimationsModule,
    ConsumptionsPageModule,
    ContractsPageModule,
    TooltipModule,
    HomePageModule,
    ServicesPagesModule,
    SettlementsPageModule,
    UnpaidPageModule,
    DirectivesModule,
    AdvicePageModule,
    AlertNotificationsPageModule,
    DynamicContentPagesModule,
    ServiceApproachPageModule,
    RefundRequestPageModule,
    RefundPrintPageModule,
    ProvisionalCounterPageModule,
    CounterPrintPageModule,
    TaxPageModule,
    TaxPrintPageModule,
    TerminationPageModule,
    TerminationPrintPageModule,

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
    HelperService,
    HelperService,
    PaymentHelperService,
    ComplaintService,
    CommonService,
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
    AdvicePageModule,
    AlertNotificationsPageModule,
    DynamicContentPagesModule
  ]
})
export class MainModule {
}
