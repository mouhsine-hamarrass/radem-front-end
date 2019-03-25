import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/do';
import {AuthHelper} from '../services/security/auth.helper';
import {environment} from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authHelper: AuthHelper) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers;
    /**
     * Add the authorization header only if the request url is the backend
     */
    if (req && req.url && req.url.indexOf(environment.apiConfig.apiUrl) > -1) {
      headers = this.authHelper.addHeaderAuthorization(req.headers);
    }

    // Clone the request to add the new header
    const clonedRequest = req.clone({headers});

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
