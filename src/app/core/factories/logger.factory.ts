// services
import {ConsoleLoggerService} from '../services/logging/console-logger.service';
// configurations
import {LoggerTypes} from './logger.type';
import {environment} from 'environments/environment';

export let loggerFactory = () => {
   switch (environment.apiConfig.loggerService) {
      case LoggerTypes.CONSOLE:
         return new ConsoleLoggerService();
      default:
         return new ConsoleLoggerService();
   }
};
