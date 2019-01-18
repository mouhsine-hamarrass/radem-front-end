import {Component, OnInit} from '@angular/core';
import {SubscriptionRequestStatus} from '../../../../shared/models/user.model';
import {AdminService} from '../../../services/admin.service';
import {TranslateService} from '@ngx-translate/core';
import _ from 'underscore';
import {SubscriptionModel} from '../../../models/subscription.model';

@Component({
    selector: 'app-requests-subscription',
    templateUrl: './requests-subscription.component.html',
    styleUrls: ['./requests-subscription.component.scss']
})
export class RequestsSubscriptionComponent implements OnInit {
    page = 1;
    pageSize = 0;
    requests: Array<SubscriptionModel>;
    totalElements: number;
    totalPages: number;
    numberOfItems: number;
    itemsPerPage: number;
    sort: any;
    filter: any;
    agentsFilter: any = [];
    statusFilter = Object.keys(SubscriptionRequestStatus);

    constructor(private adminService: AdminService,
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.LoadRequests();
        this.agentsFilterable();
    }

    onSorted(sort: any): void {
        this.sort = sort;
        this.LoadRequests();
    }

    onFiltred(filter: any): void {
        this.filter = filter;
        this.LoadRequests();
    }

    LoadRequests() {
        this.adminService.getPageableSubscriptionRequest(this.page, this.pageSize, this.filter, this.sort)
            .subscribe(response => {
                this.requests = response.data['content'];
                this.totalElements = response.data['totalElements'];
                this.totalPages = response.data['totalPages'];
                this.itemsPerPage = response.data['size'];
                this.numberOfItems = response.data['numberOfElements'];
                /*
                _.each(this.requests, (element: any) => {
                    _.extend(element, {type: this.translate.instant('TERMINATION')});
                });
                */
            }, (err) => {

            });
    }

    pageChanged(page: number): void {
        this.page = page;
        this.LoadRequests();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.LoadRequests();
    }

    agentsFilterable(): void {
        this.adminService.getAgents().subscribe(response => {
            this.agentsFilter = response.data;
        }, error => {
        });
    }
}
