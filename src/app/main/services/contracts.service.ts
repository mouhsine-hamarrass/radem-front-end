import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import {environment} from 'environments/environment';
import { Response } from '../../core/models/response.model';

@Injectable()
export class ContractsService {
  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  getWaterSubscriptions(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`https://my-json-server.typicode.com/younesMck/jsonServer/subscriptions?type=eau`);
  }
  getElectricitySubscriptions(): Observable<Response<Array<any>>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<Array<any>>>(`https://my-json-server.typicode.com/younesMck/jsonServer/subscriptions?type=electricite`);
  }
  getSubscriptions(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`https://my-json-server.typicode.com/younesMck/jsonServer/subscriptions`);
  }
  getSubscription(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`https://my-json-server.typicode.com/younesMck/jsonServer/subscriptions?id=${id}`);
  }
  getBills(police: string): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`https://my-json-server.typicode.com/younesMck/jsonServer/bills?police=${police}`);
  }
  getAllBills(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`https://my-json-server.typicode.com/younesMck/jsonServer/bills`);
  }
  getBill(numBill: string): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`https://my-json-server.typicode.com/younesMck/jsonServer/bills?numBill=${numBill}`);
  }
  getAlerts(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`https://my-json-server.typicode.com/younesMck/jsonServer/alerts`);
  }
  getReleves(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`http://my-json-server.typicode.com/adnanebaiz/data/releves`);
  }
  getMinMaxConsumption(id: String): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>
    (`http://my-json-server.typicode.com/adnanebaiz/data2/MinMaxConsumption?id=${id}`);
  }
  getContracts(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`http://my-json-server.typicode.com/adnanebaiz/data/contracts`);
  }

}
