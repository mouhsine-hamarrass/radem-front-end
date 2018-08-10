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
import { AlertComponent } from './alert/alert.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilesComponent } from './profiles/profiles.component';
import {ChecklistModule} from 'angular-checklist';
import {NgxToggleModule} from 'ngx-toggle';
import {TabsModule} from 'ngx-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import { AlertTypeComponent } from './alert-type/alert-type.component';
import { AlertTypesComponent } from './alert-types/alert-types.component';
import { SettingsComponent } from './settings/settings.component';
import {SubscriptionDetailComponent} from './subscription-detail/subscription-detail.component';

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
    TranslateModule
  ],
  declarations: [
    AdminDashboardComponent,
    CancellationRequestComponent,
    RequestsComponent,
    ClaimsComponent,
    ClaimDetailComponent,
    AlertComponent,
    UserComponent,
    UsersComponent,
    ProfileComponent,
    ProfilesComponent,
    AlertTypeComponent,
    AlertTypesComponent,
    SettingsComponent,
    SubscriptionDetailComponent
  ],
  providers: [AdminService]
})
export class AdminPagesModule {
}
