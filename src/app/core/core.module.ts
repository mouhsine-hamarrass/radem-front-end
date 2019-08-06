import {ErrorHandler, NgModule, Optional, SkipSelf} from '@angular/core';
import {OAuthService} from './services/security/oauth.service';
import {JsonFileService} from './services/json/json-file.service';
import {AuthGuard} from './guards/auth.guard';
import {LoginGuard} from './guards/login.guard';
import {AuthHelper} from './services/security/auth.helper';
import {errorHandlerFactory} from './factories/error-handler.factory';
import {authFactory} from './factories/auth.factory';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {loggerFactory} from './factories/logger.factory';
import {ValidationService} from './services/validation/validation.service';
import {throwIfAlreadyLoaded} from './guards/module-import.guard';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {SharedModule} from '../shared/shared.module';
import {AdminGuard} from './guards/admin.guard';
import {ClientGuard} from './guards/client.guard';
import {AccountGuard} from './guards/account-guard.service';


@NgModule(<NgModule>{
  imports: [
    SharedModule
  ],
  declarations: [],
  providers: [
    OAuthService,
    JsonFileService,
    AuthGuard,
    LoginGuard,
    AuthHelper,
    AdminGuard,
    AccountGuard,
    ClientGuard,
    {provide: ErrorHandler, useFactory: errorHandlerFactory},
    {provide: 'AuthService', useFactory: authFactory, deps: [HttpClient, AuthHelper]},
    {provide: 'LoggerService', useFactory: loggerFactory},
    ValidationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
