import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {AdminPagesRoutingModule} from './admin-pages-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminPagesRoutingModule
  ],
  declarations: [AdminDashboardComponent]
})
export class AdminPagesModule {
}
