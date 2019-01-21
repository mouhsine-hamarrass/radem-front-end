import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '../../core/models/response.model';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Profile} from '../models/profile.model';
import {User} from '../models/user.model';
import {Setting} from '../models/setting.model';
import {ServiceModel} from '../models/service.model';
import {AlertModel} from '../models/alert.model';
import {AlertNotificationModel} from '../models/alert-notification.model';
import {DynamicModel} from '../models/dynamic.model';
import {ConsumptionModel} from '../models/consumption.model';
import {SubscriptionModel} from '../models/subscription.model';
import {RegistrationQuestionModel} from "../models/registration-question.model";


@Injectable()
export class AdminService {
  private apiUrl: string = environment.apiConfig.apiUrl;
  private jsonServerApi: string = environment.apiConfig.jsonApiUrl;
  private headers: HttpHeaders = environment.apiConfig.headers;

  constructor(private httpClient: HttpClient) {
  }

  // termination requests
  getRequest(idRequest: string): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.apiUrl}/termination_requests/${idRequest}/find`, {headers: this.headers});
  }

  getSubscriptionDetails(id: string): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.apiUrl}/subscription_request/${id}/details`, {headers: this.headers});
  }

  getPageableTerminationRequest(page: number, pageSize: number, filter?: any, sort?: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.apiUrl}/termination_requests/paged-list?page=${page}&size=${pageSize}`,
      {
        filter,
        sort
      });
  }

  getPageableSubscriptionRequest(page: number, pageSize: number, filter?: any, sort?: any): Observable<Response<SubscriptionModel>> {
    return this.httpClient.post<Response<SubscriptionModel>>(`${this.apiUrl}/subscription_requests?page=${page}&size=${pageSize}`,
      {
        filter,
        sort
      });
  }

  getPageableRefundRequest(page: number, pageSize: number, filter?: any, sort?: any): Observable<Response<SubscriptionModel>> {
    return this.httpClient.post<Response<SubscriptionModel>>(`${this.apiUrl}/refund_requests?page=${page}&size=${pageSize}`,
      {
        filter,
        sort
      });
  }

  saveTerminationRequest(request: any): Observable<Response<number>> {
    return this.httpClient.post<Response<number>>(`${this.apiUrl}/termination_requests/save`, request, {headers: this.headers});
  }

  nextStep(idRequest: number, impaye: number, agentId: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>
    (`${this.apiUrl}/termination_requests/${idRequest}/nextstep?impaye=${impaye}&agent=${agentId}`,
      {headers: this.headers});
  }

  setAsReceived(idRequest: number, agentId: number): Observable<Response<number>> {
    return this.httpClient.get<Response<any>>
    (`${this.apiUrl}/termination_requests/${idRequest}/received?agent=${agentId}`, {headers: this.headers});
  }

  setAsReceivedSubscription(idRequest: number, agentId: number): Observable<Response<number>> {
    return this.httpClient.get<Response<any>>
    (`${this.apiUrl}/subscription_requests/${idRequest}/received?agent=${agentId}`, {headers: this.headers});
  }

  setAsInProgress(idRequest: number, agentId: number, intervenantId: number, intervantionDate: Date): Observable<Response<number>> {
    return this.httpClient.get<Response<any>>
    // tslint:disable-next-line:max-line-length
    (`${this.apiUrl}/termination_requests/${idRequest}/in_progress?agent=${agentId}&intervenant=${intervenantId}&interventionDate=${intervantionDate}`, {headers: this.headers});
  }

  setAsDepositedCounter(idRequest: number, agentId: number): Observable<Response<number>> {
    return this.httpClient.get<Response<any>>
    (`${this.apiUrl}/termination_requests/${idRequest}/deposited_counter?agent=${agentId}`, {headers: this.headers});
  }

  setAsUnpaidVerification(idRequest: number, agentId: number): Observable<Response<number>> {
    return this.httpClient.get<Response<any>>
    (`${this.apiUrl}/termination_requests/${idRequest}/unpaid_verification?agent=${agentId}`, {headers: this.headers});
  }

  setAsSettlement(idRequest: number, agentId: number): Observable<Response<number>> {
    return this.httpClient.get<Response<any>>
    (`${this.apiUrl}/termination_requests/${idRequest}/settlement?agent=${agentId}`, {headers: this.headers});
  }

  setAsRefund(idRequest: number, agentId: number): Observable<Response<number>> {
    return this.httpClient.get<Response<any>>
    (`${this.apiUrl}/termination_requests/${idRequest}/refund?agent=${agentId}`, {headers: this.headers});
  }

  setAsClosed(idRequest: number, agentId: number): Observable<Response<number>> {
    return this.httpClient.get<Response<any>>
    (`${this.apiUrl}/termination_requests/${idRequest}/closed?agent=${agentId}`, {headers: this.headers});
  }


  getPageableActiveContracts(numClient: string, page: number, pageSize: number, filter?: any, sort?: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.apiUrl}/contracts/actives/${numClient}?page=${page}&size=${pageSize}`,
      {
        filter,
        sort
      });
  }

  getPageableHistoryConsumptions(contractNo: string,
                                 dateDebut: any,
                                 dateFin: any,
                                 page: number,
                                 pageSize: number,
                                 filter?: any,
                                 sort?: any): Observable<Response<Array<ConsumptionModel>>> {
    return this.httpClient.post<Response<Array<ConsumptionModel>>>(`${this.apiUrl}/consumptions?page=${page}&size=${pageSize}`,
      {
        contractNo,
        dateDebut,
        dateFin,
        filter,
        sort
      });
  }

  getAllContractByNumClient(numClient: string): Observable<Response<number>> {
    return this.httpClient.get<Response<any>>
    (`${this.apiUrl}/contracts/contractNo/${numClient}`, {headers: this.headers});
  }


  // JSon server
  getSolde(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.jsonServerApi}/factures`, {headers: this.headers});
  }

  getConsumptionHistory(): Observable<Response<Array<any>>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<Array<any>>>(`${this.jsonServerApi}3/consommations`, {headers: this.headers});
  }

  getAllContracts(): Observable<Response<Array<any>>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<Array<any>>>(`${this.jsonServerApi}2/contracts`, {headers: this.headers});
  }

  getSettlementsByContract(contractId?: number): Observable<Response<Array<any>>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<Array<any>>>(`${this.jsonServerApi}/settlements?id=${contractId}`, {headers: this.headers});
  }

  getSettlements(contractNumber?: number): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.jsonServerApi}/settlements`, {headers: this.headers});
  }

  getContracts(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.jsonServerApi}2/contracts`, {headers: this.headers});
  }

  getReleves(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.jsonServerApi}2/releves`, {headers: this.headers});
  }

  getNextReleve(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.jsonServerApi}2/nextReleve`, {headers: this.headers});
  }

  getCompteur(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.jsonServerApi}3/Meter`, {headers: this.headers});
  }

  getConsumptions(contractNumber: number): Observable<Response<Array<any>>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<Array<any>>>(`${this.jsonServerApi}2/Consumptions?contract=${contractNumber}`, {headers: this.headers});
  }

  getMinMaxConsumption(contractNumber: number): Observable<Response<any>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<any>>(`${this.jsonServerApi}2/MinMaxConsumption?contract=${contractNumber}`, {headers: this.headers});
  }

  getUserWithBill(billNumber: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(`${this.jsonServerApi}3/Users?bill=${billNumber}`, {headers: this.headers});
  }

  getUserWithContract(contractNumber: number): Observable<Response<any>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<any>>(`${this.jsonServerApi}3/Users?contract=${contractNumber}`, {headers: this.headers});
  }

  getUserWithRef(ref: number): Observable<any> {
    return this.httpClient.get<any>(`${this.jsonServerApi}3/Users?ref=${ref}`, {headers: this.headers});
  }

  getUsers(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.jsonServerApi}3/Users`, {headers: this.headers});
  }

  getAnswer(question: String): Observable<Response<any>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Response<any>>(`${this.jsonServerApi}3/Questions?question=${question}`, {headers: this.headers});
  }

  getSoldeCrediteur(): Observable<Array<any>> {
    return this.httpClient.get<Array<any>>(`${this.jsonServerApi}3/soldes`, {headers: this.headers});
  }

  // Agents
  getAgents(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.apiUrl}/users/all`, {headers: this.headers});
  }

  // User
  saveUser(client: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.apiUrl}/auth/register`, client, {headers: this.headers});
  }

  // Alerts
  getAlerts(): Observable<Response<Array<AlertModel>>> {
    return this.httpClient.get<Response<Array<AlertModel>>>(`${this.apiUrl}/alerts`, {headers: this.headers});
  }

  getPageableAlerts(page: number, pageSize: number, filter?: any, sort?: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.apiUrl}/alerts/paged-list?page=${page}&size=${pageSize}`,
      {
        filter,
        sort
      });
  }

  getAlert(idAlert: number): Observable<Response<AlertModel>> {
    return this.httpClient.get<Response<AlertModel>>(`${this.apiUrl}/alerts/${idAlert}`, {headers: this.headers});
  }

  saveAlertNotification(alertNotification: AlertNotificationModel): Observable<Response<AlertNotificationModel>> {
    return this.httpClient.post<Response<AlertNotificationModel>>(`${this.apiUrl}/alerts/notifications`,
      alertNotification, {headers: this.headers});
  }

  hideAlertNotification(id: number): Observable<Response<any>> {
    return this.httpClient.put<Response<any>>(`${this.apiUrl}/alerts/notifications/${id}/hide`, {headers: this.headers});
  }

  getPageableAlertNotifications(page: number, pageSize: number, filter?: any, sort?: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.apiUrl}/alerts/notifications/paged-list?page=${page}&size=${pageSize}`,
      {
        filter,
        sort
      });
  }

  dropAlertNotification(id: number): Observable<Response<any>> {
    return this.httpClient.delete<Response<any>>(`${this.apiUrl}/alerts/notifications/${id}`, {headers: this.headers});
  }

  getAlertNotificationById(id: string): Observable<Response<AlertNotificationModel>> {
    return this.httpClient.get<Response<AlertNotificationModel>>(`${this.apiUrl}/alerts/notifications/${id}`, {headers: this.headers});
  }

  createAlert(alert: AlertModel): Observable<Response<AlertModel>> {
    return this.httpClient.post<Response<AlertModel>>(`${this.apiUrl}/alerts`, alert, {headers: this.headers});
  }

  saveAlert(alertId: number, alert: AlertModel): Observable<Response<AlertModel>> {
    return this.httpClient.put<Response<AlertModel>>(`${this.apiUrl}/alerts/${alertId}`, alert, {headers: this.headers});
  }

  dropAlert(alertId: number): Observable<Response<any>> {
    return this.httpClient.delete<Response<any>>(`${this.apiUrl}/alerts/${alertId}`, {headers: this.headers});
  }

  // Profiles
  getListProfiles(): Observable<Response<Array<Profile>>> {
    return this.httpClient.get<Response<Array<Profile>>>(`${this.apiUrl}/profiles`);
  }

  getPageableListProfiles(page: number, pageSize: number, filter?: any, sort?: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.apiUrl}/profiles/paged-list?page=${page}&size=${pageSize}`,
      {
        filter,
        sort
      });
  }

  dropProfile(idProfile: number) {
    return this.httpClient.post(`${this.apiUrl}/profiles/${idProfile}/delete`, null, {headers: this.headers});
  }

  saveProfile(profile: Profile) {
    return this.httpClient.post(`${this.apiUrl}/profile/save`, profile, {headers: this.headers});
  }

  getProfile(idProfile: string): Observable<Response<Profile>> {
    return this.httpClient.get<Response<Profile>>(`${this.apiUrl}/profiles/${idProfile}/find`, {headers: this.headers});
  }

  // Users
  getListUser(page: number, pageSize: number, filter?: any, sort?: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.apiUrl}/users/paged-list?page=${page}&size=${pageSize}`,
      {
        filter,
        sort
      });
  }

  dropUser(idUser: number): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.apiUrl}/users/${idUser}/delete`, null, {headers: this.headers});
  }

  createUser(user: User): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.apiUrl}/users/save`, user, {headers: this.headers});
  }

  enableUser(idUser: number): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.apiUrl}/users/${idUser}/enable`, null, {headers: this.headers});
  }

  disableUser(idUser: number): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.apiUrl}/users/${idUser}/disable`, null, {headers: this.headers});
  }

  editUser(user: User): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.apiUrl}/users/edit`, user, {headers: this.headers});
  }

  getUser(idUser: string): Observable<Response<User>> {
    return this.httpClient.get<Response<User>>(`${this.apiUrl}/users/${idUser}/find`, {headers: this.headers});
  }

  getProfileAuthorities(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.apiUrl}/profiles/${id}/authorities`, {headers: this.headers});
  }

  /**
   * Settings
   */
  getSettings(): Observable<Response<Array<Setting>>> {
    return this.httpClient.get<Response<any>>(`${this.apiUrl}/settings`);
  }

  getRegistrationQuestions(): Observable<Response<Array<RegistrationQuestionModel>>> {
    return this.httpClient.get<Response<Array<RegistrationQuestionModel>>>(`${this.apiUrl}/settings/registration-questions`);
  }

  saveSettings(settings: Array<Setting>): Observable<Response<any>> {
    return this.httpClient.put<Response<any>>(`${this.apiUrl}/settings`, settings, {headers: this.headers});
  }

  getAdvices(): Observable<Response<Setting>> {
    return this.httpClient.get<Response<Setting>>(`${this.apiUrl}/settings/ADVICES`);
  }

  saveAdvices(advices: Setting): Observable<Response<Setting>> {
    return this.httpClient.put<Response<Setting>>(`${this.apiUrl}/settings/ADVICES`, advices, {headers: this.headers});
  }

  getAllDynamicPages(): Observable<Response<Array<DynamicModel>>> {
    return this.httpClient.get<Response<Array<DynamicModel>>>(`${this.apiUrl}/dynamic-pages`);
  }

  getDynamicContent(key: string): Observable<Response<DynamicModel>> {
    return this.httpClient.get<Response<DynamicModel>>(`${this.apiUrl}/dynamic-pages/${key}`);
  }

  saveDynamicContent(content: DynamicModel): Observable<Response<DynamicModel>> {
    return this.httpClient.put<Response<DynamicModel>>(`${this.apiUrl}/dynamic-pages/edit`, content, {headers: this.headers});
  }

  /**
   * Services
   */

  getServices(): Observable<Response<Array<ServiceModel>>> {
    return this.httpClient.get<Response<Array<ServiceModel>>>(`${this.apiUrl}/services`);
  }

  getService(serviceId: number): Observable<Response<ServiceModel>> {
    return this.httpClient.get<Response<ServiceModel>>(`${this.apiUrl}/services/${serviceId}`);
  }

  createService(service: ServiceModel): Observable<Response<ServiceModel>> {
    return this.httpClient.post<Response<ServiceModel>>(`${this.apiUrl}/services`, service, {headers: this.headers});
  }

  saveService(serviceId: number, service: ServiceModel): Observable<Response<ServiceModel>> {
    return this.httpClient.put<Response<ServiceModel>>(`${this.apiUrl}/services/${serviceId}`, service, {headers: this.headers});
  }

  removeService(serviceId: number) {
    return this.httpClient.delete(`${this.apiUrl}/services/${serviceId}`, {headers: this.headers});
  }

  getPageableServices(page: number, pageSize: number, filter?: any, sort?: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.apiUrl}/services/paged-list?page=${page - 1}&size=${pageSize}`,
      {
        filter,
        sort
      });
  }

  /**
   * Dashboard
   */

  getAlertsCount(): Observable<Response<number>> {
    return this.httpClient.get<Response<number>>(`${this.apiUrl}/alerts/count`);
  }

  getRequestsCount(): Observable<Response<number>> {
    return this.httpClient.get<Response<number>>(`${this.apiUrl}/requests/count`);
  }

  getComplaintsCount(): Observable<Response<number>> {
    return this.httpClient.get<Response<number>>(`${this.apiUrl}/complaints/count`);
  }

}
