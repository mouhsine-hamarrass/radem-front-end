import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsumptionsPageComponent} from './consumptions-page.component';
import {ConsumptionsPageRoutingModule} from './consumptions-page-routing.module';
import {AdminService} from '../../services/admin.service';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {BsDropdownModule, TabsModule} from 'ngx-bootstrap';
import {ComponentsModule} from '../../../shared/components/components.module';
import {SharedModule} from '../../../shared/shared.module';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../app.translate.factory';
import {HttpClient} from '@angular/common/http';
import {ConsumptionsTableComponent} from './consumptions-table/consumptions-table.component';
import {NgxPermissionsModule} from 'ngx-permissions';

@NgModule({
    imports: [
        CommonModule,
        ConsumptionsPageRoutingModule,
        AngularFontAwesomeModule,
        SharedModule,
        BsDropdownModule,
        ComponentsModule,
        NgxPermissionsModule.forChild(),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        TabsModule,
    ],
  declarations: [ConsumptionsPageComponent, ConsumptionsTableComponent],
  providers: [AdminService],
  exports: [ConsumptionsTableComponent]
})
export class ConsumptionsPageModule {
  constructor(private translate: TranslateService) {
    this.translate.use(localStorage['language']);
  }
}
