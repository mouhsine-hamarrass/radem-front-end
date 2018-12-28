import {Component, OnInit} from '@angular/core';
import * as _ from 'underscore';
import {AdminService} from '../../../services/admin.service';
import {Statut} from '../../../../shared/models/user.model';

@Component({
    selector: 'app-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
    public terminationRequests: any;
    public requests: Array<any> = [];
    page = 1;
    pageSize = 0;
    totalElements: number;
    totalPages: number;
    numberOfItems: number;
    itemsPerPage: number;
    sort: any;
    filter: any;
    agentsFilter: any = [];
    statusFilter = Object.keys(Statut);

    constructor(private adminService: AdminService) {
    }

    ngOnInit() {
        this.LoadCancellationRequest();
        this.agentsFilterable();
        this.statusFilterable();
    }

    onSorted(sort: any): void {
        this.sort = sort;
        this.LoadCancellationRequest();
    }

    onFiltred(filter: any): void {
        this.filter = filter;
        this.LoadCancellationRequest();
    }

    LoadCancellationRequest() {
        this.adminService.getPageableRequest(this.page, this.pageSize, this.filter, this.sort)
            .subscribe(response => {
                this.requests = response.data.content;
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
                this.itemsPerPage = response.data.size;
                this.numberOfItems = response.data.numberOfElements;
                _.each(this.requests, (element: any) => {
                    _.extend(element, {type: 'Résiliation'});
                });
            }, (err) => {

            });
    }

    pageChanged(page: number): void {
        this.page = page;
        this.LoadCancellationRequest();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.LoadCancellationRequest();
    }

    agentsFilterable(): void {
        this.adminService.getAgents().subscribe(response => {
            this.agentsFilter = response.data;
        }, error => {
        });
    }

    statusFilterable(): void {

    }

    LoadSubscriptionRequest() {
        this.requests = [];
    }

    LoadRefundRequest() {
        this.requests = [];
    }
}
