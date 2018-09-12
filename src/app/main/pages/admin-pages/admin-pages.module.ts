import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {AdminPagesRoutingModule} from './admin-pages-routing.module';
import { CancellationRequestComponent } from './cancellation-request/cancellation-request.component';
import { RequestsComponent } from './requests/requests.component';
import { AdminService } from '../../services/admin.service';
import { ClaimsComponent } from './claims/claims.component';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilesComponent } from './profiles/profiles.component';
import {ChecklistModule} from 'angular-checklist';
import {NgxToggleModule} from 'ngx-toggle';
import {TabsModule} from 'ngx-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import { SettingsComponent } from './settings/settings.component';
import {SubscriptionDetailComponent} from './subscription-detail/subscription-detail.component';
import { AdvicesComponent } from './advices/advices.component';
import {QuillModule} from 'ngx-quill';
import { ServicesComponent } from './services/services.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { AlertNotificationComponent } from './alert-notification/alert-notification.component';
import { AlertComponent } from './alert/alert.component';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    ArchwizardModule,
    FormsModule,
    ReactiveFormsModule,
    ChecklistModule,
    NgxToggleModule,
    TabsModule.forRoot(),
    TranslateModule,
    QuillModule
  ],
  exports: [
    TranslateModule
  ],
  declarations: [
    AdminDashboardComponent,
    CancellationRequestComponent,
    RequestsComponent,
    ClaimsComponent,
    ClaimDetailComponent,
    UserComponent,
    UsersComponent,
    ProfileComponent,
    ProfilesComponent,
    SettingsComponent,
    SubscriptionDetailComponent,
    AdvicesComponent,
    ServicesComponent,
    ServiceFormComponent,
    AlertNotificationComponent,
    AlertComponent,
    AlertsComponent,
  ],
  providers: [AdminService]
})
export class AdminPagesModule {
}
