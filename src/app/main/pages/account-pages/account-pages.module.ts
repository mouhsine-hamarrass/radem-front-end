import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountPagesRoutingModule} from './account-pages-routing.module';
import {ChartsModule} from 'ng2-charts';
import {BsDatepickerModule, BsDropdownModule} from 'ngx-bootstrap';
import {AdminService} from '../../services/admin.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../../shared/components/components.module';
import {ProfileService} from '../../services/profile.service';
import { AccountComponent } from './account/account.component';

@NgModule({
  imports: [
    CommonModule,
    AccountPagesRoutingModule,
    ChartsModule,
    FormsModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    BsDropdownModule,
    ComponentsModule
  ],
  declarations: [
    AccountComponent,
  ],
  providers: [
    AdminService,
    ProfileService
  ]
})
export class AccountPagesModule {
}
