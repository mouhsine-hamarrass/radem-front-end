import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Response} from '../../core/models/response.model';

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

}
