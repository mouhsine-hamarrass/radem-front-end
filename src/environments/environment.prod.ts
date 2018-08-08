import {AuthTypes} from 'app/core/factories/auth.type';
import {AuthScheme} from 'app/core/models/auth-scheme.enum';
import {ErrorHandlerTypes} from 'app/core/factories/error-handler.type';
import {LoggerTypes} from 'app/core/factories/logger.type';

const server = 'http://localhost:8080/';
// const server = 'http://192.168.100.13:8080/';
export const environment = {
  appName: 'RADEMAGENCY',
  appLogo: './assets/images/logo.png',
  production: true,
  envName: 'prod',
  buildVersion: '0.0.1-SNAPSHOT',
  buildTimestamp: new Date().toISOString(),
  defaultLanguage: 'fr',
  defaultDateFormat: 'DD-MM-YYYY HH:mm',
  defaultDateFormatNoTime: 'DD-MM-YYYY',
  defaultAvatar: './assets/images/profile.png',
  emailPattern: '^([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$',
  apiConfig: {
    apiEnv: 'prod',
    timeExpired: 1200,
    credentials: {
      clientId: 'yelansari',
      clientSecret: 'admin'
    },
    apiUrls: [
      {id: 'About_SERVICE_URL', url: server + 'api/', requireAuthBefore: false},
      {id: 'OAUTH_SERVICE_URL', url: server + 'api/auth', requireAuthBefore: false},
    ],
    apiUrl: server + 'api',
    authService: AuthTypes.OAUTH,
    authScheme: AuthScheme.BEARER,
    errorHandler: ErrorHandlerTypes.SIMPLE,
    loggerService: LoggerTypes.CONSOLE
  }
};
