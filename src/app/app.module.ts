import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {createTranslateLoader} from './app.translate.factory';
import {MainModule} from './main/main.module';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {ErrorComponent} from './error/error.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {GlobalSharedModule} from './shared/global-shared.module';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
   declarations: [
      AppComponent,
      MaintenanceComponent,
      ErrorComponent,
      PageNotFoundComponent,
   ],
   imports: [
      BrowserModule,
      CoreModule,
      MainModule,
      GlobalSharedModule,
      AppRoutingModule,
      TagInputModule,
      BrowserAnimationsModule,
      TranslateModule.forRoot({
         loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
         }
      })
   ],
   providers: [
      {provide: 'api.config', useValue: environment.apiConfig},
      {provide: 'defaultLanguage', useValue: environment.defaultLanguage},
   ],
   bootstrap: [AppComponent]
})
export class AppModule {
}
