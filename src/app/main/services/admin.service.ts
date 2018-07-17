import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '../../core/models/response.model';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');


@Injectable()
export class AdminService {
  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  // termination requests
  getRequest(idRequest: string): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/termination_requests/${idRequest}/find`, {headers: headers});
  }

  getTerminationRequests(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/termination_requests`);
  }

  getTerminationRequest(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/termination_requests/${id}/find`);
  }

  saveTerminationRequest(request: any): Observable<Response<number>> {
    return this.httpClient.post<Response<number>>(`${this.urlApi}/termination_requests/save`, request, {headers: headers});
  }

  nextStep(idRequest: number, impaye: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/termination_requests/${idRequest}/nextstep?impaye=${impaye}`,
       {headers: headers});
  }

  // Complaint
  getComplaints(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/all-complaints`, {headers: headers});
  }

  getClaim(idClaim: string): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/complaints/${idClaim}/find`, {headers: headers});
  }

  saveComplaint(claim: any): Observable<Response<number>> {
    return this.httpClient.post<Response<number>>(`${this.urlApi}/complaints/save`, claim, {headers: headers});
  }

  nextStepClaim(idRequest: number, choice: boolean): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/complaints/${idRequest}/nextstep?choice=${choice}`, {headers: headers});
  }

  // JSon server
  getSolde(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`https://my-json-server.typicode.com/AdnaneBaiz/data/factures`, {headers: headers});
  }

  getSettlementsByContract(contractId?: number): Observable<Response<Array<any>>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<Array<any>>>(`https://my-json-server.typicode.com/AdnaneBaiz/data/settlements?id=${contractId}`, {headers: headers});
  }

  getSettlements(contractNumber?: number): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`https://my-json-server.typicode.com/AdnaneBaiz/data/settlements`, {headers: headers});
  }

  getContracts(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`https://my-json-server.typicode.com/AdnaneBaiz/data/contracts`, {headers: headers});
  }

  getReleves(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`https://my-json-server.typicode.com/AdnaneBaiz/data/releves`, {headers: headers});
  }

  getNextReleve(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`https://my-json-server.typicode.com/AdnaneBaiz/data/nextReleve`, {headers: headers});
  }

  getConsumptions(contractNumber: number): Observable<Response<Array<any>>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<Array<any>>>(`https://my-json-server.typicode.com/AdnaneBaiz/data2/Consumptions?contract=${contractNumber}`, {headers: headers});
  }

  getMinMaxConsumption(contractNumber: number): Observable<Response<any>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<any>>(`https://my-json-server.typicode.com/AdnaneBaiz/data2/MinMaxConsumption?contract=${contractNumber}`, {headers: headers});
  }

  // Agents
  getAgents(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/users?page=5&size=5`, {headers: headers});
  }
}
