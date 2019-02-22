import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertNotificationsPageComponent} from './alert-notifications-page.component';
import {AlertNotificationsPageRoutingModule} from './alert-notifications-page-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../app.translate.factory';
import {HttpClient} from '@angular/common/http';
import {NgxPermissionsModule} from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    AlertNotificationsPageRoutingModule,
    SharedModule,
    NgxPermissionsModule.forChild(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [AlertNotificationsPageComponent]
})
export class AlertNotificationsPageModule {
  constructor(private translate: TranslateService) {
    this.translate.use(localStorage['language']);
  }
}
