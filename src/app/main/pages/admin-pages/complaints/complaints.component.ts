import {Component, OnInit} from '@angular/core';
import {ComplaintService} from '../../../services/complaint.service';
import {AdminService} from '../../../services/admin.service';

@Component({
    selector: 'app-complaints',
    templateUrl: './complaints.component.html',
    styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {

    public complaints: any;
    page = 1;
    pageSize = 0;
    totalElements: number;
    totalPages: number;
    numberOfItems: number;
    itemsPerPage: number;
    keyword: string;
    sort: any;
    filter: any;
    agentsFilter: any = [];

    constructor(private complaintService: ComplaintService,
                private adminService: AdminService) {
    }

    ngOnInit() {
        this.getComplaints();
    }

    onSorted(sort: any): void {
        this.sort = sort;
        this.getComplaints();
    }

    onFiltred(filter: any): void {
        this.filter = filter;
        this.getComplaints();
    }

    getComplaints() {
        this.complaintService.getPageableComplaints(this.page, this.pageSize, this.keyword, this.filter, this.sort)
            .subscribe(response => {
                this.complaints = response.data.content;
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
                this.itemsPerPage = response.data.size;
                this.numberOfItems = response.data.numberOfElements;
            }, (err) => {
            });
    }

    pageChanged(page: number): void {
        this.page = page;
        this.getComplaints();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.getComplaints();
    }

    agentsFilterable(): void {
        this.adminService.getAgents().subscribe(response => {
            // this.agentsFilter = response.data['content'];
            this.agentsFilter = [
                {id: 1, title: 'agent 1'},
                {id: 2, title: 'agent 2'},
            ]
        }, error => {
        });
    }
}
