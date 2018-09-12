import {Injectable} from '@angular/core';
import {HttpClient,} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Response} from '../../core/models/response.model';
import {AlertModel} from '../models/alert.model';

@Injectable()
export class UtilsService {

  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  getAuthorities(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/authorities`);
  }
}
