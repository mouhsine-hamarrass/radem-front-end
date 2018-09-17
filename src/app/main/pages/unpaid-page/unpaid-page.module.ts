import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComponentsModule} from '../../../shared/components/components.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {UnpaidPageComponent} from './unpaid-page.component';
import {UnpaidPageRoutingModule} from './unpaid-page-routing.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UnpaidPageRoutingModule,
    AngularFontAwesomeModule,
    ComponentsModule
  ],
  declarations: [
    UnpaidPageComponent
  ]
})
export class UnpaidPageModule { }
