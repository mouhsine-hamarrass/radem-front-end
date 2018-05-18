import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeRequestComponent } from './subscribe-request/subscribe-request.component';
import { ClaimRequestComponent } from './claim-request/claim-request.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SubscribeRequestComponent, ClaimRequestComponent]
})
export class MyServicesModule { }
