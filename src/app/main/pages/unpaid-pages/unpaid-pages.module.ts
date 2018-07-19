import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnpaidPagesRoutingModule } from './unpaid-pages-routing.module';
import { UnpaidComponent } from '../account-pages/unpaid/unpaid.component';

@NgModule({
  imports: [
    CommonModule,
    UnpaidPagesRoutingModule
  ],
  declarations: [UnpaidComponent]
})
export class UnpaidPagesModule { }
