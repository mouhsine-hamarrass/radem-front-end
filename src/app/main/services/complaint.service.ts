import {Injectable} from '@angular/core';
import {ComplaintModel} from '../models/complaint.model';
import {Observable} from 'rxjs/Observable';
import {Response} from '../../core/models/response.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class ComplaintService {
    private apiUrl: string = environment.apiConfig.apiUrl;
    private jsonServerApi: string = environment.apiConfig.jsonApiUrl;
    private headers: HttpHeaders = environment.apiConfig.headers;

    constructor(private httpClient: HttpClient) {
    }

    getList(): Observable<Response<Array<any>>> {
        return this.httpClient.get<Response<Array<any>>>(`${this.apiUrl}/complaints/list`, {headers: this.headers});
    }

    getPageableComplaints(page: number, pageSize: number, filter?: any, sort?: any): Observable<Response<any>> {
        return this.httpClient.post<Response<any>>(`${this.apiUrl}/complaints/paged-list?page=${page}&size=${pageSize}`,
            {
                filter,
                sort
            });
    }

    getOne(id: string): Observable<Response<ComplaintModel>> {
        return this.httpClient.get<Response<ComplaintModel>>(`${this.apiUrl}/complaints/${id}`, {headers: this.headers});
    }

    save(complaint: any): Observable<Response<number>> {
        return this.httpClient.post<Response<number>>(`${this.apiUrl}/complaints`, complaint, {headers: this.headers});
    }

    nextStep(idRequest: number, choice: boolean): Observable<Response<any>> {
        return this.httpClient.get<Response<any>>(`${this.apiUrl}/complaints/${idRequest}/nextstep?choice=${choice}`, {headers: this.headers});
    }

    setAsSupported(idRequest: number): Observable<Response<any>> {
        return this.httpClient.get<Response<any>>(`${this.apiUrl}/complaints/${idRequest}/set-as-supported`, {headers: this.headers});
    }

    setAsAnalysis(idRequest: number): Observable<Response<any>> {
        return this.httpClient.get<Response<any>>(`${this.apiUrl}/complaints/${idRequest}/set-as-analysis`, {headers: this.headers});
    }

    setAsRequestComplement(idRequest: number): Observable<Response<any>> {
        return this.httpClient.get<Response<any>>(`${this.apiUrl}/complaints/${idRequest}/set-as-request_complement`, {headers: this.headers});
    }

    setAsTransmissionOfInformation(idRequest: number): Observable<Response<any>> {
        return this.httpClient.get<Response<any>>(`${this.apiUrl}/complaints/${idRequest}/set-as-transmission_of_information`,
            {headers: this.headers});
    }

    setAsReplyProvided(idRequest: number): Observable<Response<any>> {
        return this.httpClient.get<Response<any>>(`${this.apiUrl}/complaints/${idRequest}/set-as-reply-provided`, {headers: this.headers});
    }

    setAsClosed(idRequest: number): Observable<Response<any>> {
        return this.httpClient.get<Response<any>>(`${this.apiUrl}/complaints/${idRequest}/set-as-closed`, {headers: this.headers});
    }

    getAll(): Observable<Response<any>> {
        return this.httpClient.get<Response<any>>(`${this.apiUrl}/complaints`, {headers: this.headers});
    }

    getTypes(): Observable<Response<any>> {
        return this.httpClient.get<Response<any>>(`${this.apiUrl}/complaints/types`, {headers: this.headers});
    }
}
