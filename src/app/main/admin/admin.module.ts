import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RequestComponent } from './request/request.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { ListRequestsComponent } from './list-requests/list-requests.component';
import { ListComplaintsComponent } from './list-complaints/list-complaints.component';

@NgModule({
  imports: [
    CommonModule,
    RequestComponent
  ],
  declarations: [
    AdminComponent,
    RequestComponent,
    ComplaintComponent,
    ListRequestsComponent,
    ListComplaintsComponent]
})
export class AdminModule { }
