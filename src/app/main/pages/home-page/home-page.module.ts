import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import {HomePageRoutingModule} from './home-page-routing.module';
import {ChartsModule} from 'ng2-charts';
import {BsDatepickerConfig, BsDatepickerModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    BsDatepickerModule,
    HomePageRoutingModule
  ],
  declarations: [HomePageComponent]
})
export class HomePageModule { }
