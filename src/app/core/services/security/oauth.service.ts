import {Inject, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConfig} from '../../models/api-config';
import {AuthHelper} from './auth.helper';
import {CommonUtil} from '../../helpers/common.util';
import {OauthResponse} from '../../models/oauth-response';
import {OauthToken} from '../../models/oauth-token';
import {environment} from '../../../../environments/environment';

@Injectable()
export class OAuthService implements AuthService {

  constructor(private http: HttpClient,
              @Inject('api.config') private apiConfig: ApiConfig,
              private authHelper: AuthHelper) {
  }

  getServiceUrl(): string {
    return CommonUtil.getApiUrl('OAUTH_SERVICE_URL', this.apiConfig);
  }

  login(username: string, password: string) {
    const data = {'username': username, 'password': password};
    let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    headers = this.authHelper.addHeaderAuthorization(headers);

    return this.http.post(this.getServiceUrl(), data, {headers: headers}).map((response: OauthResponse) => {
      let userData: OauthToken = response.data;
      const expiresIn = userData.expiresIn || this.apiConfig.timeExpired;

      // add access token when mock environment
      if (!userData.accessToken && !userData.tokenType) {
        userData = {
          'accessToken': 'a61afd98-8e9e-4f16-9366-31abcc0bb522',
          'tokenType': 'Bearer',
          'refreshToken': 'a61afd98-8e9e-4f16-9366-31abcc0bb522',
          'expiresIn': 43199,
          'scope': 'openid',
          'user': {
            id: 1,
            username: environment.apiConfig.credentials.clientId,
            password: environment.apiConfig.credentials.clientSecret,
            firstname: 'Younes',
            lastname: 'EL ANSARI',
            email: 'elansariyounes@gmail.com'
          }
        };
      }

      // login successful if there's a jwt token in the response
      if (userData.accessToken) {
        AuthHelper.addUserInfo(username, expiresIn);
        AuthHelper.addTokenInfo(userData, expiresIn);
      }

      return userData;
    });
  }

  logout() {
    // remove user session info
    AuthHelper.clearCookies();
  }
}
