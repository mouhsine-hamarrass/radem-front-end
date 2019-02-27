import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Response} from '../../core/models/response.model';
import {Observable} from 'rxjs/Observable';
import {environment} from 'environments/environment';
import {ComplaintModel} from '../models/complaint.model';
import {ContractAttachModel} from '../models/contract-attach.model';
import {LastIndexNextVisitModel} from '../models/last-index-next-visit.model';
import {LastInvoiceModel} from '../models/last-invoice.model';
import {LastPaymentModel} from '../models/last-payment.model';
import 'rxjs/add/observable/of';
import {StatusModel} from '../models/status.model';
import {SubscriptionRequestModel} from '../models/subscription-request.model';
import {FeedbackModel} from '../models/feedback.model';
import {CancellationRequestModel} from '../models/cancellation-request.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class ServicesService {
  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }


  registerAttachContract(contractNo: string, invoiceNo: string, month: number): Observable<Response<ContractAttachModel>> {
    return this.httpClient.post<Response<ContractAttachModel>>(`${this.urlApi}/auth/attach-contract`, {
      contractNo,
      invoiceNo,
      month
    })
  }

  attachContract(contractNo: string, invoiceNo: string, month: number): Observable<Response<ContractAttachModel>> {
    return this.httpClient.post<Response<ContractAttachModel>>(`${this.urlApi}/contracts/attach`, {
      contractNo,
      invoiceNo,
      month
    })
  }

  detachContract(contractNo: string): Observable<Response<ContractAttachModel>> {
    return this.httpClient.get<Response<ContractAttachModel>>(`${this.urlApi}/contracts/detach/${contractNo}`);
  }

  clientAttachedContracts(): Observable<Response<Array<ContractAttachModel>>> {
    return this.httpClient.get<Response<Array<ContractAttachModel>>>(`${this.urlApi}/clients/attached-contracts`);
    /*
    const mockData = {
        status: '200',
        language: 'en',
        statusInfo: 'mock',
        data: [
            {
                id: 1,
                contractNo: 'CR-123456',
                typeNetwork: 'ELEC',
                type: '212',
                childs: [
                    {
                        id: 1,
                        contractNo: 'CR-123456',
                        typeNetwork: 'ELEC',
                        type: '434'
                    }
                ]
            },
            {
                id: 2,
                contractNo: 'CR-4798759',
                typeNetwork: 'EAU',
                type: '121',
                childs: [
                    {
                        id: 1,
                        contractNo: 'CR-4798759',
                        typeNetwork: 'EAU',
                        type: '444'
                    }
                ]
            }
        ]
    };
    return Observable.of(mockData);
    */
  }

  getClientDetailsByContractNo(contractNo: string): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/clients/${contractNo}`);
    /*
    let mockData = {
        status: '200',
        language: 'en',
        statusInfo: 'mock',
        data: [
            {
                id: 1,
                contractNo: 'CR-123456',
                holderFirstname: 'Rachid',
                holderLastname: 'EL KADOURI',
                consumptionAddress: '15 rue 12 lots annour casablanca',
                contractStatus: 'active'
            },
            {
                id: 2,
                contractNo: 'CR-4798759',
                holderFirstname: 'Youssef',
                holderLastname: 'EL KAROURI',
                consumptionAddress: 'Hay Essalama, 23, rue 4, Boujdour',
                contractStatus: 'inactive'
            }
        ]
    };
    mockData.data = _.findWhere(mockData.data, {contractNo});
    return Observable.of(mockData);
    */
  }

  getUnpaidBalanceByContractNo(contractNo: string): Observable<Response<string>> {
    return this.httpClient.get<Response<string>>(`${this.urlApi}/contracts/unpaid-balance/${contractNo}`)
    /*
    const mockData = {
        status: '200',
        language: 'en',
        statusInfo: 'mock',
        data: '34512'
    };
    return Observable.of(mockData);
    */
  }

  getLastVisitLastIndexByContractNo(contractNo: string): Observable<Response<LastIndexNextVisitModel>> {
    return this.httpClient.get<Response<LastIndexNextVisitModel>>(`${this.urlApi}/contracts/last-index-and-next-visit/${contractNo}`)
    /*
    const mockData = {
        status: '200',
        language: 'en',
        statusInfo: 'mock',
        data: {
            id: 1,
            dateLastIndex: new Date().toDateString(),
            lastInedx: '68749878934',
            dateNextIndex : new Date().toDateString()
        }
    };
    return Observable.of(mockData);
    */
  }

  getLastInvoiceByContractNo(contractNo: string): Observable<Response<LastInvoiceModel>> {
    return this.httpClient.get<Response<LastInvoiceModel>>(`${this.urlApi}/contracts/last-invoice/${contractNo}`)
    /*
    const mockData = {
        status: '200',
        language: 'en',
        statusInfo: 'mock',
        data: {
            id: 1,
            month: '4',
            year: '2019',
            value: '4200',
            consumption: '2800',
            type_network: 'EAU'
        }
    };
    return Observable.of(mockData);
    */
  }

  getLastPaymentByContractNo(contractNo: string): Observable<Response<LastPaymentModel>> {
    return this.httpClient.get<Response<LastPaymentModel>>(`${this.urlApi}/contracts/last-payment/${contractNo}`)
    /*
    const mockData = {
        status: '200',
        language: 'en',
        statusInfo: 'mock',
        data: {
            id: 1,
            mode: 'Espèce',
            date: new Date().toDateString(),
            amount: '789.40'
        }
    };
    return Observable.of(mockData);
    */
  }

  getSubscriptionStatus(): Observable<Response<Array<StatusModel>>> {
    return this.httpClient.get<Response<Array<StatusModel>>>(`${this.urlApi}/subscription-request-status/all`);
  }

  saveFeedback(requestId: number, feedback: FeedbackModel): Observable<Response<number>> {
    return this.httpClient.post<Response<number>>(`${this.urlApi}/requests/${requestId}/feedback/submit`, feedback, {headers: headers});
  }

  getSubscriptionDetails(requestNo: string): Observable<Response<SubscriptionRequestModel>> {
    return this.httpClient.get<Response<SubscriptionRequestModel>>(`${this.urlApi}/subscription-request/details/${requestNo}`);
  }

  // termination requests
  getSubscriptions(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/subscriptions`);
  }

  // getTerminationRequests(): Observable<Response<Array<any>>> {
  //   return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/termination_requests`);
  // }

 //Mouhsine

  getTerminationRequests(contractNo: string, page: number, pageSize: number): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>
    (`${this.urlApi}/termination-requests/${contractNo}?page=${page}&size=${pageSize}`);
  }

  getTerminationDetails(requestNo: string): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/termination-request/details/${requestNo}`);
  }

  getTerminationStatus(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/termination-request-status/all`);

  }

  getPageableTerminationRequests(page: number, pageSize: number, filter?: any, sort?: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.urlApi}/termination_requests/paged-list?page=${page}&size=${pageSize}`,
      {
        filter,
        sort
      });
  }

  getTerminationRequest(id: string): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/termination_requests/${id}/find`);
  }

  saveTerminationRequest(request: any): Observable<Response<number>> {
    return this.httpClient.post<Response<number>>(`${this.urlApi}/argis/termination_requests/save`, request, {headers: headers});
  }
  saveRefundRequest(request: any): Observable<Response<number>> {
    return this.httpClient.post<Response<number>>(`${this.urlApi}/argis/Refund-requests/save`, request, {headers: headers});
  }
  // subscription request
  saveSubscriptionRequest(request: any): Observable<Response<number>> {
    return this.httpClient.post<Response<number>>(`${this.urlApi}/argis/subscription-requests/save`, request, {headers: headers});
  }

  getSubscriptionRequests(contractNo: string, page: number, pageSize: number): Observable<Response<Array<SubscriptionRequestModel>>> {
    return this.httpClient.get<Response<Array<SubscriptionRequestModel>>>
    (`${this.urlApi}/subscription-requests/${contractNo}?page=${page}&size=${pageSize}`);
  }

  // complaint
  saveComplaint(complaint: any): Observable<Response<number>> {
    return this.httpClient.post<Response<number>>(`${this.urlApi}/complaints`, complaint, {headers: headers});
  }

  saveComplaintsFeedback(complaintsFeedback: any): Observable<Response<number>> {
    return this.httpClient.post<Response<number>>(`${this.urlApi}/complaints/save-feedback`, complaintsFeedback, {headers: headers});
  }

  getComplaints(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/complaints`);
  }

  getPageableComplaints(page: number, pageSize: number, filter?: any, sort?: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.urlApi}/complaints/paged-list?page=${page}&size=${pageSize}`,
      {
        filter,
        sort
      });
  }

  getPageableClientComplaints(page: number, pageSize: number, filter?: any, sort?: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.urlApi}/complaints/client/paged-list?page=${page}&size=${pageSize}`,
      {
        filter,
        sort
      });
  }

  getComplaint(id: string): Observable<Response<ComplaintModel>> {
    return this.httpClient.get<Response<ComplaintModel>>(`${this.urlApi}/complaints/${id}`);
  }

  getObjects(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/complaints/objects`);
  }

  // User (temporary service TODO: remove it when localstorage is working)
  getUser(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/users/${id}/find`);
  }

  getAllAuthoritiesByCategory(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/authorities`);
  }

  /**
   * Reporting
   */
  downloadPdfConsumptions(contractNo: string, dateStart: any, dateEnd: any) {
    const url = `${this.urlApi}/reports/downloads/consumptions?ext=pdf`;
    const req = new HttpRequest('POST', url, {
      contractNo,
      dateStart,
      dateEnd
    }, {
      responseType: 'arraybuffer',
    });
    return this.httpClient.request(req);
  }

  downloadXlsConsumptions(contractNo: string, dateStart: any, dateEnd: any) {
    const url = `${this.urlApi}/reports/downloads/consumptions?ext=xls`;
    const req = new HttpRequest('POST', url, {
      contractNo,
      dateStart,
      dateEnd
    }, {
      responseType: 'arraybuffer',
    });
    return this.httpClient.request(req);
  }

  downloadPdfSettlements(contractNo: string, dateStart: any, dateEnd: any) {
    const url = `${this.urlApi}/reports/downloads/settlements?ext=pdf`;
    const req = new HttpRequest('POST', url, {
      contractNo,
      dateStart,
      dateEnd
    }, {
      responseType: 'arraybuffer',
    });
    return this.httpClient.request(req);
  }

  downloadXlsSettlements(contractNo: string, dateStart: any, dateEnd: any) {
    const url = `${this.urlApi}/reports/downloads/settlements?ext=xls`;
    const req = new HttpRequest('POST', url, {
      contractNo,
      dateStart,
      dateEnd
    }, {
      responseType: 'arraybuffer',
    });
    return this.httpClient.request(req);
  }
}
