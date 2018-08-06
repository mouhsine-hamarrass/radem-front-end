import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractPagesRoutingModule } from './contract-pages-routing.module';
import { ContractsComponent } from './contracts/contracts.component';
import {ContractsService} from '../../services/contracts.service';

@NgModule({
  imports: [
    CommonModule,
    ContractPagesRoutingModule
  ],
  declarations: [ContractsComponent],
  providers: [
    ContractsService
  ]
})
export class ContractPagesModule { }
