import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminPagesRoutingModule} from './admin-pages-routing.module';
import {CancellationRequestComponent} from './cancellation-request/cancellation-request.component';
import {AdminService} from '../../services/admin.service';
import {ArchwizardModule} from 'angular-archwizard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserComponent} from './user/user.component';
import {UsersComponent} from './users/users.component';
//import {ProfileComponent} from './profile/profile.component';
//import {ProfilesComponent} from './profiles/profiles.component';
import {ChecklistModule} from 'angular-checklist';
import {NgxToggleModule} from 'ngx-toggle';
import {BsDropdownModule, TabsModule} from 'ngx-bootstrap';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {SettingsComponent} from './settings/settings.component';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {SubscriptionDetailComponent} from './subscription-detail/subscription-detail.component';
import {AdvicesComponent} from './advices/advices.component';
import {QuillModule} from 'ngx-quill';
import {ServicesComponent} from './services/services.component';
import {ServiceFormComponent} from './service-form/service-form.component';
import {AlertNotificationComponent} from './alert-notification/alert-notification.component';
import {AlertComponent} from './alert/alert.component';
import {AlertsComponent} from './alerts/alerts.component';
import {ComponentsModule} from '../../../shared/components/components.module';
import {AlertNotificationsComponent} from './alert-notifications/alert-notifications.component';
import {ComplaintComponent} from './complaint/complaint.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {SharedModule} from '../../../shared/shared.module';
import {createTranslateLoader} from '../../../app.translate.factory';
import {HttpClient} from '@angular/common/http';
import {DynamicContentComponent} from './dynamic-content/dynamic-content.component';
import {RequestsCancellationComponent} from './requests-cancellation/requests-cancellation.component';
import {RequestsSubscriptionComponent} from './requests-subscription/requests-subscription.component';
import {RequestsRefundComponent} from './requests-refund/requests-refund.component';
import {RequestCancellationDetailComponent} from './request-cancellation-detail/request-cancellation-detail.component';
import {RequestSubscriptionDetailComponent} from './request-subscription-detail/request-subscription-detail.component';
import {RequestRefundDetailComponent} from './request-refund-detail/request-refund-detail.component';
import {NgxPermissionsModule} from 'ngx-permissions';
import {TransactionsComponent} from './transactions/transactions.component';





@NgModule({
  imports: [
    NguiAutoCompleteModule,
    CommonModule,
    AdminPagesRoutingModule,
    ArchwizardModule,
    FormsModule,
    ReactiveFormsModule,
    ChecklistModule,
    NgxToggleModule,
    SharedModule,
    TabsModule.forRoot(),
    TranslateModule,
    QuillModule,
    ComponentsModule,
    BsDropdownModule,
    NgxPermissionsModule.forChild(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SharedModule
  ],
  exports: [
    TranslateModule
  ],
  declarations: [
    AdminDashboardComponent,
    CancellationRequestComponent,
    UserComponent,
    UsersComponent,
    // ProfileComponent,
    // ProfilesComponent,
    SubscriptionDetailComponent,
    AlertsComponent,
    SettingsComponent,
    AdvicesComponent,
    ServicesComponent,
    ServiceFormComponent,
    AlertNotificationComponent,
    AlertNotificationsComponent,
    AlertComponent,
    AlertsComponent,
    ComplaintComponent,
    ComplaintsComponent,
    DynamicContentComponent,
    RequestsCancellationComponent,
    RequestsSubscriptionComponent,
    RequestsRefundComponent,
    RequestCancellationDetailComponent,
    RequestSubscriptionDetailComponent,
    RequestRefundDetailComponent,
    TransactionsComponent
  ],
  providers: [
    AdminService
  ]
})
export class AdminPagesModule {
  constructor(private translate: TranslateService) {
    this.translate.use(localStorage['language']);
  }
}
