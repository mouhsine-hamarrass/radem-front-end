import {ApiConfig} from '../models/api-config';
import {Credentials} from '../models/credentials';
import {ApiUrl} from '../models/api-url';

// const faker = require('faker');

export class MocksUtil {
   /**
    * Create a mocked instance of the ApiConfig object to be used in tests
    * @param apiUrls the list of ApiUrls with which must be created.
    */
   static createMockedApiConfig(): ApiConfig {
      const apiConfig: ApiConfig = new ApiConfig();
      apiConfig.credentials = new Credentials('test', 'test'); // (faker.internet.userName(), faker.internet.password());
      apiConfig.timeExpired = 5;
      apiConfig.apiUrls = [
         new ApiUrl('ABOUT_SERVICE_URL', 'http://localhost:8080/api/'),
         new ApiUrl('AUTH_SERVICE_URL', 'http://localhost:3000/api/auth'),
      ];
      apiConfig.errorHandler = 'SIMPLE';
      apiConfig.loggerService = 'CONSOLE';
      apiConfig.authService = 'OAUTH';

      return apiConfig;
   }

   /**
    * Create a mocked instance of the oath token returned by the authentication service
    */
   static createMockedOauthToken() {
      return {
         'accessToken': 'a1b2c3d4-4g67-5t5t-6j6j-5f4fg4',
         'tokenType': 'bearer',
         'refreshToken': '12345678-8888-9999-b676',
         'expiresIn': 43199,
         'scope': 'openid'
      };
   }
}
