import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumptionPageComponent } from './consumption-page.component';
import {ConsumptionPageRoutingModule} from './consumption-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ConsumptionPageRoutingModule
  ],
  declarations: [ConsumptionPageComponent]
})
export class ConsumptionPageModule { }
