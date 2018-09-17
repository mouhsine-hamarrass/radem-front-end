import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComponentsModule} from '../../../shared/components/components.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {SettlementsPageComponent} from './settlements-page.component';
import {SettlementsPageRoutingModule} from './settlements-page-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule, BsDropdownModule} from 'ngx-bootstrap';
import {ChartsModule} from 'ng2-charts';
import {AccountPagesRoutingModule} from '../account-pages/account-pages-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SettlementsPageRoutingModule,
    AngularFontAwesomeModule,
    ComponentsModule,
    BsDropdownModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SettlementsPageComponent
  ]
})
export class SettlementsPageModule { }
