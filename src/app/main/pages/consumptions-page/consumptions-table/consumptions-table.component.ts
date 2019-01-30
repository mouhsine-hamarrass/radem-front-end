import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {AdminService} from '../../../services/admin.service';

@Component({
    selector: 'app-consumptions-table',
    templateUrl: './consumptions-table.component.html',
    styleUrls: ['./consumptions-table.component.scss']
})
export class ConsumptionsTableComponent implements OnInit {
    user: User;
    contracts: any;
    page = 1;
    pageSize = 0;
    totalElements: number;
    numberOfItems: number;
    totalPages: number;
    itemsPerPage: number;
    sort: any;
    filter: any;

    constructor(private adminService: AdminService) {
    }

    ngOnInit() {
        if (localStorage.getItem(AuthHelper.USER_ID)) {
            this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
        }
        this.getActiveContracts();
    }

    getActiveContracts() {
        this.adminService.getPageableActiveContracts(
            this.page,
            this.pageSize)
            .subscribe(response => {
                this.contracts = response.data.content;
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
                this.itemsPerPage = response.data.size;
                this.numberOfItems = response.data.numberOfElements;
                console.log(response);
            }, err => console.log(err));
    }

    onSorted(sort: any): void {
        this.sort = sort;
        this.getActiveContracts();
    }

    onFiltred(filter: any): void {
        this.filter = filter;
        this.getActiveContracts();
    }

    pageChanged(pageNo: number) {
        this.page = pageNo;
        this.getActiveContracts();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.getActiveContracts();
    }

}
