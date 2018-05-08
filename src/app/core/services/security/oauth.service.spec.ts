import {async, getTestBed, inject, TestBed} from '@angular/core/testing';

import {OAuthService} from './oauth.service';
import {MocksUtil} from '../../helpers/mocks.util';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthHelper} from './auth.helper';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HttpParams} from '@angular/common/http';
import {CommonUtil} from '../../helpers/common.util';


describe('OAuthService', () => {
   const apiConfig = MocksUtil.createMockedApiConfig();
   const mockResponse = MocksUtil.createMockedOauthToken();

   let injector: TestBed;
   let service: OAuthService;
   let httpMock: HttpTestingController;

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            {provide: 'api.config', useValue: apiConfig},
            {provide: 'defaultLanguage', useValue: 'fr'},
            AuthHelper,
            OAuthService
         ],
         imports: [
            BrowserModule,
            HttpClientModule,
            HttpClientTestingModule
         ]
      });

      injector = getTestBed();
      service = injector.get(OAuthService);
      httpMock = injector.get(HttpTestingController);
   });

   afterEach(() => {
      httpMock.verify();
   });

   it('should create an instance of the service', () => {
      expect(service).toBeTruthy();
   });

   it('should get oauth token', async(inject([AuthHelper], (authHelper: AuthHelper) => {
      const username = 'fakeUserId', password = 'fakePassword';

      service.login(username, password).subscribe((userData) => {
         expect(userData.accessToken).toEqual(mockResponse.accessToken);
         expect(userData.tokenType).toEqual(mockResponse.tokenType);
         expect(userData.expiresIn).toEqual(mockResponse.expiresIn);
         expect(userData.refreshToken).toEqual(mockResponse.refreshToken);
         expect(userData.scope).toEqual(mockResponse.scope);

         expect(authHelper.getUserLogged()).toEqual(username);
         expect(authHelper.getToken()).toEqual(mockResponse.accessToken);
      });

      const req = httpMock.expectOne(service.getServiceUrl());
      const body = new HttpParams({fromString: req.request.body});

      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
      expect(body.get('username')).toBe('fakeUserId');
      expect(body.get('password')).toBe('fakePassword');
      expect(body.get('grant_type')).toBe('password');
      req.flush(mockResponse);
   })));

   it('should logout from the application', async(
      inject([AuthHelper], (authHelper: AuthHelper) => {
         const token = 'aaabbbccc';
         const userId = 'testUser';
         const seconds = 5;
         const expiredTimeString = CommonUtil.changeExpiredTime(seconds);
         document.cookie = AuthHelper.TOKEN_ID + '=' + token + '; expires=' + expiredTimeString + '; path=/';
         document.cookie = AuthHelper.USER_ID + '=' + userId + '; expires=' + expiredTimeString + '; path=/';

         service.logout();

         expect(authHelper.getUserLogged()).toEqual('');
         expect(authHelper.getToken()).toEqual('');
      })));
});
