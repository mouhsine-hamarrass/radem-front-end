import {ErrorHandler} from '@angular/core';
import {SimpleErrorHandler} from '../error/error.handler';
import {ErrorHandlerTypes} from './error-handler.type';
// configurations
import {environment} from '../../../environments/environment';

export let errorHandlerFactory = (): ErrorHandler => {
   switch (environment.apiConfig.errorHandler) {
      case ErrorHandlerTypes.SIMPLE:
         return new SimpleErrorHandler();
      default:
         return new SimpleErrorHandler();
   }
};
