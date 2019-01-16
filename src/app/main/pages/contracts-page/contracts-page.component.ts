import {Component, OnInit, TemplateRef} from '@angular/core';
import {ContractsService} from '../../services/contracts.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';
import {AdminService} from '../../services/admin.service';
import {Color} from 'ng2-charts';
import * as _ from 'underscore';
import {User} from '../../models/user.model';
import {AuthHelper} from '../../../core/services/security/auth.helper';
import * as moment from 'moment';
import {environment} from '../../../../environments/environment';
import {ContractModel} from '../../models/contract.model';
import {CounterModel} from '../../models/counter.model';


@Component({
    selector: 'app-contracts-page',
    templateUrl: './contracts-page.component.html',
    styleUrls: ['./contracts-page.component.scss']
})
export class ContractsPageComponent implements OnInit {

    public user: User;
    public contracts: Array<ContractModel>;
    public contract: ContractModel;
    public counter: CounterModel;

    months: any;
    values: any;
    solde: any;
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

    pageBills = 1;
    pageSizeBills = 0;
    totalElementsBills: number;
    totalPagesBills: number;
    numberOfItemsBills: number;
    itemsPerPageBills: number;

    private modalOptions = <ModalOptions>{backdrop: true, ignoreBackdropClick: false, class: 'modal-lg'};
    public chartType = 'bar';
    public chartLabels: Array<any> = ['Jan', 'Féf', 'Mar', 'Avr', 'May', 'Jun', 'Jui', 'Auo', 'Sep', 'Oct', 'Nov', 'Dec'];
    public chartDatasets: Array<any> = [
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: ''},
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: ''}
    ];
    public chartOptions: any = {
        title: {
            text: 'Moyenne de consomation',
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
        if (localStorage.getItem(AuthHelper.USER_ID)) {
            this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
        }
        this.getSubscriptions();
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
        this.contractsServices.getPageableContracts(this.user.clientNo, this.page, this.pageSize, this.filter, this.sort)
            .subscribe(response => {
                _.each(response.data['content'], (contract: ContractModel) => {
                    contract.dateEffetAbonnement =
                        moment(new Date(contract.dateEffetAbonnement)).format(environment.defaultDateFormatNoTime);
                    contract.dateFinAbonnement =
                        moment(new Date(contract.dateFinAbonnement)).format(environment.defaultDateFormatNoTime);
                });
                this.contracts = response.data['content'];
                this.totalElements = response.data['totalElements'];
                this.totalPages = response.data['totalPages'];
                this.itemsPerPage = response.data['size'];
                this.numberOfItems = response.data['numberOfElements'];
            }, error => {
                console.log(error);
            });
    }

    getSoldeByNumContract(id) {
        this.contractsServices.getSoldeByNumContract(id).subscribe(response => {
        }, error => console.log(error));
    }

    getHistoryConsumptions(template: TemplateRef<any>, id: string) {
        this.contractsServices.getHistoryConsumptions(id).subscribe(response => {
            this.history = response.data;debugger;
            _.each(this.history, (histo, i) => {
                _.each(histo.consumptions, (cons, j) => {
                    this.chartDatasets[i]['data'][j + 1] = cons;
                    this.chartDatasets[i]['label'] = histo.annee;
                    // histo.month = this.chartLabels[j + 1];
                    // histo.montant = parseFloat(cons);
                });
            });
            this.modalRef = this.modalService.show(template, this.modalOptions);
            console.log(this.history);
        }, error => console.log(error));
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

    openContractDetails(template: TemplateRef<any>, id: string) {
        this.contractsServices.getDetailsContract(id).subscribe(responseContract => {
            this.contractsServices.getCounterByContractId(id).subscribe(responseCounter => {
                this.contractsServices.getSoldeByNumContract(id).subscribe(responseSolde => {
                    this.contract = responseContract.data;
                    if (this.contract) {
                        this.contract.dateCreationAbonnement =
                            moment(new Date(this.contract.dateCreationAbonnement)).format(environment.defaultDateFormatNoTime);
                        this.contract.dateEffetAbonnement =
                            moment(new Date(this.contract.dateEffetAbonnement)).format(environment.defaultDateFormatNoTime);
                        this.contract.dateFinAbonnement =
                            moment(new Date(this.contract.dateFinAbonnement)).format(environment.defaultDateFormatNoTime);
                    }
                    this.counter = responseCounter.data;
                    if (this.counter) {
                        this.counter.datePoseCompteur =
                            moment(new Date(this.counter.datePoseCompteur)).format(environment.defaultDateFormatNoTime);
                    }
                    this.solde = {
                        soldeExigible: responseSolde.data['soldeExigible'] || 0,
                        soldetot: responseSolde.data['soldetot'] || 0
                    };

                    this.modalRef = this.modalService.show(template, this.config);
                }, error => console.log(error));
            }, err => console.log(err));
        }, err => console.log(err));
    }

    getAllBillsByContractId(id) {
        this.contractsServices.getUnpaidInvoicesByContractId(id, this.pageBills, this.pageSizeBills).subscribe(response => {
            this.bills = response.data['content'];
            this.totalElementsBills = response.data['totalElements'];
            this.totalPagesBills = response.data['totalPages'];
            this.itemsPerPageBills = response.data['size'];
            this.numberOfItemsBills = response.data['numberOfElements'];
        })
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
