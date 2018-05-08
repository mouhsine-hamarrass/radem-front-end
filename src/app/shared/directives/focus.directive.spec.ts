import {ElementRef, NO_ERRORS_SCHEMA} from '@angular/core';
import {async, inject, TestBed} from '@angular/core/testing';
import {FocusDirective} from './focus.directive';
import {RouterTestingModule} from '@angular/router/testing';
// factory and helpers
import {loggerFactory} from '../../core/factories/logger.factory';
// services
import {LoggerService} from '../../core/services/logging/logger.service';
import {SpinnerService} from '../components/spinner/spinner.service';
import {SharedModule} from '../shared.module';
import {MocksUtil} from '../../core/helpers/mocks.util';
import {AuthHelper} from '../../core/services/security/auth.helper';
import {OAuthService} from '../../core/services/security/oauth.service';

class MockElementRef implements ElementRef {
   nativeElement = {};
}

describe('FocusDirective', () => {
   const apiConfig = MocksUtil.createMockedApiConfig();

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [],
         imports: [
            SharedModule,
            RouterTestingModule.withRoutes([])
         ],
         providers: [
            {provide: 'api.config', useValue: apiConfig},
            {provide: 'cookie.user.id', useValue: 'backUserId'},
            {provide: 'cookie.token.id', useValue: 'backToken'},
            {provide: 'defaultLanguage', useValue: 'en'},
            {provide: 'AuthService', useClass: OAuthService},
            {provide: 'LoggerService', useFactory: loggerFactory},
            {provide: ElementRef, useValue: new MockElementRef()},
            SpinnerService,
            AuthHelper
         ],
         schemas: [NO_ERRORS_SCHEMA]
      })
         .compileComponents();
   }));

   it('should create an instance', inject([ElementRef], (element: ElementRef) => {
      const directive = new FocusDirective(element);
      expect(directive).toBeTruthy();
   }));
});
