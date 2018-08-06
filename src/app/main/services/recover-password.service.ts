import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../../../node_modules/@angular/common/http';
import {environment} from 'environments/environment';
import { Observable } from '../../../../node_modules/rxjs';
import { Response } from '../../core/models/response.model';


let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class RecoverPasswordService {
  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  sendToken(email: string): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/auth/reset?email=${email}`);
  }
  resetPassword(token: string, password: string): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/auth/reset-password?token=${token}`, password, {headers: headers});
  }

}
