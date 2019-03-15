import {AuthTypes} from 'app/core/factories/auth.type';
import {AuthScheme} from 'app/core/models/auth-scheme.enum';
import {ErrorHandlerTypes} from 'app/core/factories/error-handler.type';
import {LoggerTypes} from 'app/core/factories/logger.type';
import {HttpHeaders} from '@angular/common/http';

const server = 'localhost:8085/radem-ael-api';
// const server = 'http://212.83.140.195:8085/radem-ael-api';
const jsonServer = 'https://my-json-server.typicode.com/senyou/jsonserver';


let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

export const environment = {
  appName: 'RADEM-AEL',
  appLogo: './assets/images/logo.png',
  production: false,
  envName: 'test',
  buildVersion: '0.0.1-SNAPSHOT',
  buildTimestamp: new Date().toISOString(),
  defaultLanguage: 'fr',
  defaultDateFormat: 'DD-MM-YYYY HH:mm',
  defaultDateFormatNoTime: 'DD-MM-YYYY',
  defaultAvatar: './assets/images/profile.png',
  // tslint:disable-next-line:max-line-length
  emailPattern: '^([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$',
  apiConfig: {
    apiEnv: 'test',
    timeExpired: 1200,
    credentials: {
      clientId: 'yelansari',
      clientSecret: 'admin'
    },
    apiUrls: [
      {id: 'About_SERVICE_URL', url: server + '/', requireAuthBefore: false},
      {id: 'OAUTH_SERVICE_URL', url: server + '/auth', requireAuthBefore: false},
    ],
    apiUrl: server,
    jsonApiUrl: jsonServer,
    headers: headers,
    authService: AuthTypes.OAUTH,
    authScheme: AuthScheme.BEARER,
    errorHandler: ErrorHandlerTypes.SIMPLE,
    loggerService: LoggerTypes.CONSOLE
  }
};
