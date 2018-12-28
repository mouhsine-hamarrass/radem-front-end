import {Component, OnInit, TemplateRef} from '@angular/core';
import {ContractsService} from '../../services/contracts.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';
import {AdminService} from '../../services/admin.service';
import {Color} from 'ng2-charts';
import * as _ from 'underscore';


@Component({
    selector: 'app-contracts-page',
    templateUrl: './contracts-page.component.html',
    styleUrls: ['./contracts-page.component.scss']
})
export class ContractsPageComponent implements OnInit {
    months: any;
    values: any;
    solde: Array<any> = [];
    history: any;
    subscriptions;
    subscription: Array<any> = [];
    bills;
    bill;
    modalRef: BsModalRef;
    config = {
        backdrop: true,
        ignoreBackdropClick: false,
        class: 'modal-lg'
    };

    page = 1;
    pageSize = 0;
    totalElements: number;
    totalPages: number;
    numberOfItems: number;
    itemsPerPage: number;
    sort: any;
    filter: any;

    private modalOptions = <ModalOptions>{backdrop: true, ignoreBackdropClick: false, class: 'modal-lg'};
    public chartType = 'bar';
    // public chartConsoTitle = 'Moyenne des 12 dernier mois';
    public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'];
    public chartDatasets: Array<any> = [
        {data: [65, 59, 80, 81, 56, 70, 40, 30, 20, 15, 68], label: '2017'},
        {data: [28, 48, 40, 19, 86, 27, 90, 60, 25, 15, 80], label: '2018'}
    ];
    public chartOptions: any = {
        title: {
            text: 'Moyenne de consomation (2017-2018)',
            display: true,
        },
        responsive: true
    };
    private firstYbar: Color = {
        backgroundColor: 'rgba(151,187,205, 1)',
        borderWidth: 1,
        borderColor: 'rgba(151,187,205,1)',
        pointBackgroundColor: 'rgba(151,187,205,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(220,220,220,1)'
    };
    private secondYbar: Color = {
        backgroundColor: 'rgba(180, 228, 250, 1)',
        borderWidth: 1,
        borderColor: 'rgba(180, 228, 250,1)',
        pointBackgroundColor: 'rgba(180, 228, 250,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(151,187,205,1)'
    };
    public chartColors: Array<any> = [
        this.firstYbar,
        this.secondYbar
    ];

    constructor(private modalService: BsModalService,
                private contractsServices: ContractsService, private soldeService: AdminService) {
    }

    ngOnInit() {
        this.getSubscriptions();
        this.getSoldeCrediteur();
    }

    onSorted(sort: any): void {
        this.sort = sort;
        this.getSubscriptions();
    }

    onFiltred(filter: any): void {
        this.filter = filter;
        this.getSubscriptions();
    }

    getSubscriptions() {
        this.contractsServices.getSubscriptions(this.page, this.pageSize, this.filter, this.sort).subscribe(response => {
            this.subscriptions = response;
            /*
            this.subscriptions = response.data.content;
            this.totalElements = response.data.totalElements;
            this.totalPages = response.data.totalPages;
            this.itemsPerPage = response.data.size;
            this.numberOfItems = response.data.numberOfElements;
            */
        }, err => {
            console.log(err);
        });
    }

    getSoldeCrediteur() {
        this.soldeService.getSoldeCrediteur().subscribe(response => {
            this.solde = response;
        }, err => {
            console.log(err);
        });
    }


    pageChanged(page: number): void {
        this.page = page;
        this.getSubscriptions();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.getSubscriptions();
    }

    openHistory(template: TemplateRef<any>) {
        this.soldeService.getConsumptionHistory().subscribe(response => {
            this.modalRef = this.modalService.show(template, this.modalOptions);
            this.history = response;
            console.log(this.history);
        })
    }

    openDetailSubscription(template: TemplateRef<any>, subscriptionId: number) {
        this.contractsServices.getSubscription(subscriptionId).subscribe(response => {
            this.modalRef = this.modalService.show(template, this.config);
            this.subscription = response;
        });
    }

    showBills(police: string): void {
        this.contractsServices.getBills(police).subscribe(response => {
            this.bills = response;
        }, err => {
        });
    }

    openBillDetail(template: TemplateRef<any>, numBill: string) {
        this.contractsServices.getBill(numBill).subscribe(response => {
            console.log(this.bill);
            this.modalRef = this.modalService.show(template, this.config);
            this.bill = response[0];
        });
    }

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {

    }

}
