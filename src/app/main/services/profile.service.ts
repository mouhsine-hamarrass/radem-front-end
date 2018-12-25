import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {environment} from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { Response } from '../../core/models/response.model';
import {AlertModel} from '../models/alert.model';
import {User} from '../models/user.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class ProfileService {
  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  getUser(id: number): Observable<Response<User>> {
    return this.httpClient.get<Response<User>>(`${this.urlApi}/users/${id}/find`);
  }

  saveProfile(profile: any): Observable<Response<any>>  {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/users/save-client-profile`, profile, {headers: headers});
  }

  getAlertNotifications(): Observable<Response<Array<AlertModel>>> {
    return this.httpClient.get<Response<Array<AlertModel>>>(`${this.urlApi}/alerts/notifications`);
  }

}
