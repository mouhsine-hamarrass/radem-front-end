import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RequestComponent } from './request/request.component';
import { ListRequestsComponent } from './list-requests/list-requests.component';
import { ListComplaintsComponent } from './list-complaints/list-complaints.component';
import { RequestService } from '../core/services/request.service';
import { ArchwizardModule } from 'angular-archwizard';
import { RouterModule } from '@angular/router';
import { PopupModule } from 'ng2-opd-popup';


@NgModule({
  imports: [
    CommonModule,
    RequestComponent,
    ArchwizardModule,
    RouterModule,
    PopupModule.forRoot(),
  ],
  declarations: [
    AdminComponent,
    RequestComponent,
    ListRequestsComponent,
    ListComplaintsComponent
  ],
  providers: [RequestService]
})
export class AdminModule { }
