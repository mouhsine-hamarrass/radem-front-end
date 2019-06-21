import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '../../../shared/components/components.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDropdownModule, TabsModule, TooltipModule} from 'ngx-bootstrap';
import {SharedModule} from '../../../shared/shared.module';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../app.translate.factory';
import {HttpClient} from '@angular/common/http';
import {InvoicesPageRoutingModule} from './invoices-page-routing.module';
import {InvoicesPageComponent} from './invoices-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    TabsModule,
    InvoicesPageRoutingModule,
    AngularFontAwesomeModule,
    ComponentsModule,
    BsDropdownModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SharedModule
  ],
  exports: [
    InvoicesPageComponent
  ],
  declarations: [
    InvoicesPageComponent
  ]
})
export class InvoicesPageModule {
  constructor(private translate: TranslateService) {
    this.translate.use(localStorage['language']);
  }
}
