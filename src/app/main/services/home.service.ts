import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Response} from '../../core/models/response.model';
import {AlertNotificationModel} from '../models/alert-notification.model';
import * as moment from 'moment';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class HomeService {
  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  getAlertNotificationByUserId(idUser: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/alerts/find/${idUser}`, {headers: headers});
  }

  getAlertsNotification(page: number, pageSize: number): Observable<Response<Array<AlertNotificationModel>>> {
    return this.httpClient.post<Response<Array<AlertNotificationModel>>>(`${this.urlApi}/alerts/notifications/paged-list?page=${page}&size=${pageSize}`, {
      dateStart: moment(),
      dateEnd: moment().subtract(5, 'days'),
    });
  }

  readAlertNotification(id: number): Observable<Response<any>> {
    return this.httpClient.put<Response<any>>(`${this.urlApi}/alerts/notifications/${id}/read`, {});
  }

}
