import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import * as _ from 'underscore';
import * as moment from 'moment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService,
              private router: Router,
              private translate: TranslateService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// Clone the request to add the new header.
    const authReq = req.clone({headers: req.headers.set('headerName', 'headerValue')});
// send the newly created request
    return next.handle(authReq)
      .catch((response, caught) => {
        if (response && response.error) {
          console.log('error Occurred ------');
          if (response.error.data) {
            if (typeof response.error.data === 'string') {
              this.translate.get(response.error.data).subscribe(msg => {
                this.toastr.error(msg, '', {
                  timeOut: 3000,
                });
              });
              if (response.error.data === 'PERMISSION_NOT_GRANTED') {
                setTimeout(() => {
                  this.router.navigate(['/home']);
                }, 100);
              }
            } else if (typeof response.error.data === 'object') {
              _.each(response.error.data, (error: any) => {
                this.translate.get(error.field).subscribe(field => {
                  this.translate.get(error.errorCode).subscribe(msgError => {
                    this.toastr.error(field + ' : ' + msgError, '', {
                      timeOut: 3000,
                    });
                  });
                });
              });
            }
            console.log(response.error.data);
          } else {
            if (response.status === 403 || response.status === 404 || response.status === 400 || response.status === 500) {
              if (typeof response.error === 'string') {
                this.translate.get(JSON.parse(response.error).message).subscribe(msg => {
                  this.toastr.error(msg, '', {
                    timeOut: 3000,
                  });
                });
              } else {
                this.translate.get(response.error.message).subscribe(msg => {
                  this.toastr.error(msg, '', {
                    timeOut: 3000,
                  });
                });
              }
            } else if (response.status === 0) { // Server down
              this.translate.get('SERVER_DOWN').subscribe(msgError => {
                this.toastr.error(msgError, '', {
                  timeOut: 3000,
                });
              });
              setTimeout(() => {
                this.router.navigate(['/maintenance']);
              }, 100);
            }
          }
        }
// intercept the error response and displace it to the console
        console.log(response);
// return the error to the method that called it
        return Observable.throw(response);
      }) as any;
  }
}
