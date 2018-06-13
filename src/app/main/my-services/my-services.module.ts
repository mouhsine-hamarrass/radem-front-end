import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyServicesRoutingModule } from './my-services-routing/my-services-routing.module';
import { SubscribeRequestComponent } from './subscribe-request/subscribe-request.component';
import { ClaimRequestComponent } from './claim-request/claim-request.component';
import { OnlinePaymentComponent } from './online-payment/online-payment.component';
import {MyServicesComponent} from './my-services.component';
import { ArchwizardModule } from 'angular-archwizard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TerminationComponent } from './termination/termination.component';
import { NewTerminationComponent } from './new-termination/new-termination.component';


@NgModule({
  imports: [
    CommonModule,
    MyServicesRoutingModule,
    ArchwizardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [MyServicesComponent, SubscribeRequestComponent, ClaimRequestComponent, OnlinePaymentComponent, TerminationComponent, NewTerminationComponent]
})
export class MyServicesModule { }
