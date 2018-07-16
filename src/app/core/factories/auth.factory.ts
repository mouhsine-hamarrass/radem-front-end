import {AuthTypes} from './auth.type';
import {environment} from 'environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/security/auth.service';
import {AuthHelper} from '../services/security/auth.helper';
import {OAuthService} from '../services/security/oauth.service';

export let authFactory = (http: HttpClient, authHelper: AuthHelper): AuthService => {
   switch (environment.apiConfig.authService) {
      case AuthTypes.OAUTH:
         return new OAuthService(http, environment.apiConfig, authHelper);
      default:
         return new OAuthService(http, environment.apiConfig, authHelper);
   }
};
