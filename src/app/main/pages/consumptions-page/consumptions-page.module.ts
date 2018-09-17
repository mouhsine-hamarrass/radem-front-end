import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsumptionsPageComponent} from './consumptions-page.component';
import {ConsumptionsPageRoutingModule} from './consumptions-page-routing.module';
import {AdminService} from '../../services/admin.service';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {BsDropdownModule} from 'ngx-bootstrap';
import {ComponentsModule} from '../../../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ConsumptionsPageRoutingModule,
    AngularFontAwesomeModule,
    BsDropdownModule,
    ComponentsModule
  ],
  declarations: [ConsumptionsPageComponent],
  providers: [AdminService]
})
export class ConsumptionsPageModule {
}
