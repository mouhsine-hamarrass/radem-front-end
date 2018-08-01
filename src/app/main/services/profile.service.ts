import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {environment} from 'environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../../core/models/response.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class ProfileService {
  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  getUser(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/users/${id}/find`);
  }

  saveProfile(profile: any): Observable<Response<any>>  {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/users/save-client-profile`, profile, {headers: headers});
  }

}
