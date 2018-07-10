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

@NgModule({
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    ArchwizardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminDashboardComponent,
    CancellationRequestComponent,
    RequestsComponent,
    ClaimsComponent
  ],
  providers: [AdminService]
})
export class AdminPagesModule {
}
