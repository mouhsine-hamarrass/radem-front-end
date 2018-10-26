import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertModule, BsDatepickerModule} from 'ngx-bootstrap';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DirectivesModule
  ],
  declarations: [
  ],
  providers: [],
  exports: [
  ]
})
export class UIElementsModule {
}
