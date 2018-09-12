import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '../../core/models/response.model';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Profile} from '../models/profile.model';
import {User} from '../models/user.model';
import {AlertTypeModel} from '../models/alert-type.model';

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

  nextStep(idRequest: number, impaye: number, agentId: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>
    (`${this.urlApi}/termination_requests/${idRequest}/nextstep?impaye=${impaye}&agent=${agentId}`,
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

  getConsumptionHistory(): Observable<Response<Array<any>>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<Array<any>>>(`https://my-json-server.typicode.com/AdnaneBaiz/data3/consommations`, {headers: headers});
  }

  getAllContracts(): Observable<Response<Array<any>>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<Array<any>>>(`https://my-json-server.typicode.com/AdnaneBaiz/data3/contracts`, {headers: headers});
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

  getCompteur(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`https://my-json-server.typicode.com/AdnaneBaiz/data2/Meter`, {headers: headers});
  }

  getConsumptions(contractNumber: number): Observable<Response<Array<any>>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<Array<any>>>(`https://my-json-server.typicode.com/AdnaneBaiz/data2/Consumptions?contract=${contractNumber}`, {headers: headers});
  }

  getMinMaxConsumption(contractNumber: number): Observable<Response<any>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<any>>(`https://my-json-server.typicode.com/AdnaneBaiz/data2/MinMaxConsumption?contract=${contractNumber}`, {headers: headers});
  }

  getUserWithBill(billNumber: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(`https://my-json-server.typicode.com/AdnaneBaiz/data2/Users?bill=${billNumber}`, {headers: headers});
  }

  getUserWithContract(contractNumber: number): Observable<Response<any>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<any>>(`https://my-json-server.typicode.com/AdnaneBaiz/data2/Users?contract=${contractNumber}`, {headers: headers});
  }

  getUserWithRef(ref: number): Observable<any> {
    return this.httpClient.get<any>(`https://my-json-server.typicode.com/AdnaneBaiz/data2/Users?ref=${ref}`, {headers: headers});
  }

  getUsers(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`https://my-json-server.typicode.com/AdnaneBaiz/data2/Users`, {headers: headers});
  }

  getQuestions(): Observable<Response<Array<any>>> {
    let h = new HttpHeaders();
    h = h.set('Content-Type', 'application/json; charset=utf-8');
    h.append('Authorization', 'Basic VXNlcm5hbWU6UGFzc3dvcmQ=');
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<Array<any>>>(`https://my-json-server.typicode.com/AdnaneBaiz/data2/Questions`, {headers: h});
  }

  getAnswer(question: String): Observable<Response<any>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<any>>(`https://my-json-server.typicode.com/AdnaneBaiz/data2/Questions?question=${question}`, {headers: headers});
  }

  getSoldeCrediteur(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`https://my-json-server.typicode.com/AdnaneBaiz/data3/soldes`, {headers: headers});
  }

  // Agents
  getAgents(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/users?page=5&size=5`, {headers: headers});
  }

  // User
  saveUser(client: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.urlApi}/auth/register`, client, {headers: headers});
  }

  // Alerts
  getAlertTypes(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/alerts/types`, {headers: headers});
  }

  getAlert(idAlert: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/alerts/${idAlert}/find`, {headers: headers});
  }

  getAlertsNotifications(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/alerts/alertNotifications`, {headers: headers});
  }

  saveAlertNotification(alertNotification: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.urlApi}/alerts/save`, alertNotification, {headers: headers});
  }

  // Profiles
  getListProfiles(): Observable<Response<Array<Profile>>> {
    return this.httpClient.get<Response<Array<Profile>>>(`${this.urlApi}/profiles`);
  }

  getPageableListProfiles(page: number, pageSize: number, keyword?: string): Observable<Response<any>> {
    if (keyword) {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/profiles-list?page=${page}&size=${pageSize}&keyword=${keyword}`);
    } else {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/profiles-list?page=${page}&size=${pageSize}`);
    }
  }

  dropProfile(idProfile: number) {
    return this.httpClient.post(`${this.urlApi}/profiles/${idProfile}/delete`, null, {headers: headers});
  }

  saveProfile(profile: Profile) {
    return this.httpClient.post(`${this.urlApi}/profile/save`, profile, {headers: headers});
  }

  getProfile(idProfile: string): Observable<Response<Profile>> {
    return this.httpClient.get<Response<Profile>>(`${this.urlApi}/profiles/${idProfile}/find`, {headers: headers});
  }

  // Users
  getListUser(pageNo?: number, countNo?: number, keyword?: string): Observable<Response<Array<User>>> {
    return this.httpClient.get<Response<Array<User>>>(`${this.urlApi}/users?page=${pageNo}&size=${countNo}
    &keyword=${keyword}`);
  }

  dropUser(idUser: number): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.urlApi}/users/${idUser}/delete`, null, {headers: headers});
  }

  createUser(user: User): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.urlApi}/users/save`, user, {headers: headers});
  }

  enableUser(idUser: number): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.urlApi}/users/${idUser}/enable`, null, {headers: headers});
  }

  disableUser(idUser: number): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.urlApi}/users/${idUser}/disable`, null, {headers: headers});
  }

  editUser(user: User): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.urlApi}/users/edit`, user, {headers: headers});
  }

  getUser(idUser: string): Observable<Response<User>> {
    return this.httpClient.get<Response<User>>(`${this.urlApi}/users/${idUser}/find`, {headers: headers});
  }

  getProfileAuthorities(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/profiles/${id}/authorities`, {headers: headers});
  }

  /**
   * Alerts Types
   */

  getPageableAlertTypes(page: number, pageSize: number, keyword: string): Observable<Response<any>> {
    if (keyword) {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/alerts/types-list?page=${page - 1}&size=${pageSize}&keyword=${keyword}`);
    } else {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/alerts/types-list?page=${page - 1}&size=${pageSize}`);
    }
  }

  getAlertType(alertTypeId: number): Observable<Response<AlertTypeModel>> {
    return this.httpClient.get<Response<AlertTypeModel>>(`${this.urlApi}/alerts/types/${alertTypeId}`, {headers: headers});
  }

  createAlertType(alertType: AlertTypeModel) {
    return this.httpClient.post(`${this.urlApi}/alerts/types`, alertType, {headers: headers});
  }

  saveAlertType(alertTypeId: number, alertType: AlertTypeModel) {
    return this.httpClient.put(`${this.urlApi}/alerts/types/${alertTypeId}`, alertType, {headers: headers});
  }

  dropAlertType(alertTypeId: number) {
    return this.httpClient.delete(`${this.urlApi}/alerts/types/${alertTypeId}`, {headers: headers});
  }
}
