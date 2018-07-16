import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractPagesRoutingModule } from './contract-pages-routing.module';
import { ContractsComponent } from './contracts/contracts.component';

@NgModule({
  imports: [
    CommonModule,
    ContractPagesRoutingModule
  ],
  declarations: [ContractsComponent]
})
export class ContractPagesModule { }
