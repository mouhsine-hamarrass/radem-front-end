import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
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
import {LightTransactionSummary} from '../models/lightTransactionSummary';
import {TransactionSummaryModel} from '../models/transactionSummary.model';
import {User} from '../models/user.model';
import {HttpParam} from '../../core/models/http-param';
import {ReleveModel} from '../models/releve.model';
import {ContractRefund} from '../models/contract-refund.model';
import {NewRefundRequestModel} from '../models/new-refund-request.model';
import {SimpleRefundModel} from '../models/simpleRefund.model';
import {Attachment} from '../models/attachment.model';

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

  getUnpaidBalanceByContractNo(contractNo: string): Observable<Response<number>> {
    return this.httpClient.get<Response<number>>(`${this.urlApi}/contracts/unpaid-balance/${contractNo}`)
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

  getRefundStatus(): Observable<Response<Array<StatusModel>>> {
    return this.httpClient.get<Response<Array<StatusModel>>>(`${this.urlApi}/refund-request-status/all`);
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

  //Mouhsine termination
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

  //Mouhsine refund

  getRefundRequests(contractNo: string, page: number, pageSize: number): Observable<Response<Array<SimpleRefundModel>>> {
    return this.httpClient.get<Response<Array<SimpleRefundModel>>>
    (`${this.urlApi}/refund-requests/${contractNo}?page=${page}&size=${pageSize}`);
  }

  getRefundDetails(requestNo: string): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/refund-request/details/${requestNo}`);
  }

  redirectToCmi(transactionSummary: LightTransactionSummary, amount: string, user: User) {
    const params: Array<HttpParam> = [
      {name: 'clientid', value: transactionSummary.clientId},
      {name: 'amount', value: amount},
      {name: 'okUrl', value: transactionSummary.okUrl},
      {name: 'failUrl', value: transactionSummary.failUrl},
      {name: 'TranType', value: transactionSummary.tranType},
      {name: 'callbackUrl', value: transactionSummary.callbackUrl},
      {name: 'shopurl', value: transactionSummary.shopUrl},
      {name: 'currency', value: transactionSummary.currency},
      {name: 'rnd', value: transactionSummary.rnd},
      {name: 'storetype', value: transactionSummary.stereotype},
      {name: 'hashAlgorithm', value: transactionSummary.hashAlgorithm},
      {name: 'lang', value: transactionSummary.lang},
      {name: 'refreshtime', value: transactionSummary.refreshTime},
      {name: 'BillToName', value: user.firstname + ' ' + user.lastname},
      {name: 'BillToStreet1', value: user.address},
      {name: 'email', value: user.email},
      {name: 'tel', value: user.phone},
      {name: 'encoding', value: transactionSummary.encoding},
      {name: 'oid', value: transactionSummary.oid},
      {name: 'hash', value: transactionSummary.hash}
    ];

    const cmiForm = document.createElement('form');
    // cmiForm.target = '_blank';
    cmiForm.method = 'POST';
    cmiForm.action = environment.sendDataUrl;
    params.forEach(param => {
      const mapInput = document.createElement('input');
      mapInput.type = 'hidden';
      mapInput.name = param.name;
      mapInput.setAttribute('value', param.value);
      cmiForm.appendChild(mapInput);
    });
    document.body.appendChild(cmiForm);
    cmiForm.submit();
  }


  // mouhsine embranchment

  getEmbranchmentRequests(contractNo: string, page: number, pageSize: number): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>
    (`${this.urlApi}/connection-requests/${contractNo}?page=${page}&size=${pageSize}`);
  }

  //Mouhsine Transaction Salary

  getTransactionSammury(amount: string): Observable<Response<LightTransactionSummary>> {
    return this.httpClient.post<Response<LightTransactionSummary>>(`${this.urlApi}/payments/transactionSummary`, amount);

  }


  sendTransactionSummary(transactionSummary: TransactionSummaryModel): Observable<Response<number>> {

    return this.httpClient.post<Response<number>>(`${this.urlApi}/payments/prePayment`, transactionSummary);
  }

  getEmbranchmentDetails(requestNo: string): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/connection-request/details/${requestNo}`);
  }

  getEmbranchmentStatus(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/connection-request-status/all`);
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

  autoMeterRead(releve: ReleveModel): Observable<Response<number>> {
    return this.httpClient.post<Response<number>>(`${this.urlApi}/releve/meterRead`, releve, {headers: headers})
  }

  loadMeter(contractNo: string): Observable<Response<ReleveModel>> {
    return this.httpClient.get<Response<ReleveModel>>(`${this.urlApi}/releve/${contractNo}`, {headers: headers});
  }

  // abd
  getRefundedContracts(contracts: Array<string>): Observable<Response<Array<ContractRefund>>> {
    return this.httpClient.post<Response<Array<ContractRefund>>>(`${this.urlApi}/contracts/refunded`, contracts, {headers: headers})
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('files', file);
    const url = `${this.urlApi}/attachments/upload`;
    const req = new HttpRequest('POST', url, formdata, {
      reportProgress: true,
      responseType: 'text',
    });
    const req2 = req.clone({});
    return this.httpClient.request(req2);
  }

  saveNewRefundRequest(newModel: NewRefundRequestModel): Observable<Response<string>> {
    return this.httpClient.post<Response<string>>(`${this.urlApi}/refund-request/save`, newModel, {headers: headers})
  }

  getAttachment(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/attachments/${id}`);
  }

  downloadAttachmentById(attachmentId: number) {
    const url = `${this.urlApi}/attachments/download/${attachmentId}`;
    const req = new HttpRequest('GET', url, {}, {
      responseType: 'arraybuffer',
    });
    return this.httpClient.request(req);
  }

  getRefundRequestAttachedFileInfos(attachmentId: Array<number>): Observable<Response<Attachment>> {
    return this.httpClient.get<Response<Attachment>>(`${this.urlApi}/attachments/${attachmentId[0]}`, {headers: headers})
  }

}
