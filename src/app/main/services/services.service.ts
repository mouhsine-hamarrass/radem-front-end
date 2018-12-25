import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Response} from '../../core/models/response.model';
import {Observable} from 'rxjs/Observable';
import {environment} from 'environments/environment';
import {ComplaintModel} from '../models/complaint.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class ServicesService {
    private urlApi: string;

    constructor(private httpClient: HttpClient) {
        this.urlApi = environment.apiConfig.apiUrl;
    }

    // termination requests
    getSubscriptions(): Observable<Response<Array<any>>> {
        return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/subscriptions`);
    }

    getTerminationRequests(): Observable<Response<Array<any>>> {
        return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/termination_requests`);
    }

    getPageableTerminationRequests(page: number, pageSize: number, keyword: string): Observable<Response<any>> {
        if (keyword) {
            return this.httpClient.get<Response<any>>(`${this.urlApi}/termination_requests/paged-list?page=${page}&size=${pageSize}&keyword=${keyword}`);
        } else {
            return this.httpClient.get<Response<any>>(`${this.urlApi}/termination_requests/paged-list?page=${page}&size=${pageSize}`);
        }
    }

    getTerminationRequest(id: string): Observable<Response<Array<any>>> {
        return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/termination_requests/${id}/find`);
    }

    saveTerminationRequest(request: any): Observable<Response<number>> {
        return this.httpClient.post<Response<number>>(`${this.urlApi}/termination_requests/save`, request, {headers: headers});
    }

    // subscription request
    saveSubscriptionRequest(request: any): Observable<Response<number>> {
        return this.httpClient.post<Response<number>>(`${this.urlApi}/subscription_requests/save`, request, {headers: headers});
    }

    getSubscriptionRequests(page: number, pageSize: number, keyword: string, filter?: any, sort?: any): Observable<Response<any>> {
        if (keyword) {
            return this.httpClient.post<Response<any>>
            (`${this.urlApi}/subscription_requests/paged-list?page=${page}&size=${pageSize}&keyword=${keyword}`,
                {
                    filter,
                    sort
                });
        } else {
            return this.httpClient.post<Response<any>>
            (`${this.urlApi}/subscription_requests/paged-list?page=${page}&size=${pageSize}`,
                {
                    filter,
                    sort
                });
        }
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

    getPageableComplaints(page: number, pageSize: number, keyword: string, filter?: any, sort?: any): Observable<Response<any>> {
        if (keyword) {
            return this.httpClient.post<Response<any>>
            (`${this.urlApi}/complaints/paged-list?page=${page}&size=${pageSize}&keyword=${keyword}`,
                {
                    filter,
                    sort
                });
        } else {
            return this.httpClient.post<Response<any>>
            (`${this.urlApi}/complaints/paged-list?page=${page}&size=${pageSize}`,
                {
                    filter,
                    sort
                });
        }
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
    downloadPdfConsumptions() {
        const url = `${this.urlApi}/download/consumptions?ext=pdf`;
        const req = new HttpRequest('GET', url, {
            responseType: 'arraybuffer',
        });
        return this.httpClient.request(req);
    }

    downloadXlsConsumptions() {
        const url = `${this.urlApi}/download/consumptions?ext=xls`;
        const req = new HttpRequest('GET', url, {
            responseType: 'arraybuffer',
        });
        return this.httpClient.request(req);
    }

    downloadPdfSettlements() {
        const url = `${this.urlApi}/download/settlements?ext=pdf`;
        const req = new HttpRequest('GET', url, {
            responseType: 'arraybuffer',
        });
        return this.httpClient.request(req);
    }

    downloadXlsSettlements() {
        const url = `${this.urlApi}/download/settlements?ext=xls`;
        const req = new HttpRequest('GET', url, {
            responseType: 'arraybuffer',
        });
        return this.httpClient.request(req);
    }
}
