import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ContractsService} from '../../services/contracts.service';
import {AdminService} from '../../services/admin.service';
import {AuthHelper} from '../../../core/services/security/auth.helper';
import {User} from '../../models/user.model';
import {ContractModel} from '../../models/contract.model';
import * as moment from 'moment';
import * as _ from 'underscore';
import {CommonService} from '../../services/common.service';

@Component({
    selector: 'app-unpaid',
    templateUrl: './unpaid-page.component.html',
    styleUrls: ['./unpaid-page.component.scss']
})
export class UnpaidPageComponent implements OnInit {
    bills = [];
    contractsBills = [];
    selectedBills = [];
    total: number;
    totalUnpaid: number;

    toggleContracts = false;
    totalBillsContracts = 0;
    totalBillsExigible = 0;

    user: User;
    userContracts: Array<ContractModel> = [];
    page = 1;
    pageSize = 0;
    totalElements: number;
    totalPages: number;
    numberOfItems: number;
    itemsPerPage: number;

    dropdownSettings: any = {};
    selectedContract: any = [];

    @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;

    constructor(
        private contractServices: ContractsService,
        private commonService: CommonService,
        private adminService: AdminService) {
        this.dropdownSettings = this.commonService.initMultiSelect('Filtrer les contrats', true, '', 1);
        this.total = 0;
        this.totalUnpaid = 0;

        // data mock
        this.contractsBills = [
            {
                id: 1,
                numeroContrat: 'ABC123456',
                typeContrat: 'A',
                address: '15 rue 12 lots annour casablanca',
                bills: [
                    {
                        id: 1,
                        numeroFacture: 'FAC-7987894',
                        periode: 12,
                        year: 2018,
                        solde: 100,
                        soldeExigible: 0,
                        isExigible: false
                    },
                    {
                        id: 2,
                        numeroFacture: 'FAC-987984',
                        periode: 8,
                        year: 2018,
                        solde: 100,
                        soldeExigible: 100,
                        isExigible: true
                    }
                ]
            },
            {
                id: 2,
                numeroContrat: 'EFG123456',
                typeContrat: 'E',
                address: 'lorem ipsuum lo dihezidoezibdezdez',
                bills: [
                    {
                        id: 1,
                        numeroFacture: 'FAC-987987',
                        periode: 4,
                        year: 2017,
                        solde: 100,
                        soldeExigible: 100,
                        isExigible: true
                    },
                    {
                        id: 2,
                        numeroFacture: 'FAC-798749',
                        periode: 3,
                        year: 2017,
                        solde: 100,
                        soldeExigible: 0,
                        isExigible: false
                    }
                ]
            },
            {
                id: 3,
                numeroContrat: 'ABC123459',
                typeContrat: 'A',
                address: 'dezdiehzihjfoizehfoiez ua',
                bills: [
                    {
                        id: 1,
                        numeroFacture: 'FAC-89789I',
                        periode: 2,
                        year: 2016,
                        solde: 100,
                        soldeExigible: 100,
                        isExigible: false
                    },
                    {
                        id: 2,
                        numeroFacture: 'FAC-7897984',
                        periode: 5,
                        year: 2016,
                        solde: 100,
                        soldeExigible: 100,
                        isExigible: false
                    },
                    {
                        id: 2,
                        numeroFacture: 'FAC-78789789',
                        periode: 11,
                        year: 2016,
                        solde: 100,
                        soldeExigible: 100,
                        isExigible: true
                    }
                ]
            }
        ];
        this.calcUnpaidBills();
    }

    ngOnInit() {
        if (localStorage.getItem(AuthHelper.USER_ID)) {
            this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
        }
        this.getClientContracts();
    }

    getClientContracts() {
        this.adminService.getAllContractByNumClient().subscribe(response => {
            if (response.data) {
                this.userContracts = response.data;
                console.log(this.userContracts);
                _.each(this.userContracts, (element: any) => {
                    _.extend(element, {id: element.numeroContrat, itemName: `${element.numeroContrat} - (${element.typeContrat})`});
                });
            }
        }, error => {

        });
    }

    getAllUnpaidBills() {
        this.total = 0;
        this.totalUnpaid = 0;
        this.contractServices.getPageableUnpaidBills(this.page, this.pageSize)
            .subscribe(response => {
                this.bills = response.data.content;
                this.calcUnpaidBills();
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
                this.itemsPerPage = response.data.size;
                this.numberOfItems = response.data.numberOfElements;
                console.log(this.bills);
            }, err => {
            });
    }

    calcUnpaidBills(): void {
        this.totalUnpaid = 0;
        this.total = 0;
        this.totalBillsExigible = 0;
        this.contractsBills.map((contract) => {
            contract.bills.map((bill, index) => {
                this.totalUnpaid += parseFloat(bill.solde);
                this.total += bill.isExigible ? bill.solde : 0;
                this.totalBillsExigible += bill.isExigible ? bill.solde : 0;
            })
        });
        /*
        this.checkboxes.forEach((element) => {
            if (element.nativeElement.getAttribute('data-type') === 'true') {
                element.nativeElement.indeterminate = true
            }
        });
        */
    }

    calcTotal(amount, operation): void {
        if (operation === 'add') {
            this.total += parseFloat(amount)
        } else {
            this.total -= parseFloat(amount)
        }
    }

    toggleCheckAll($event, contractsBills) {
        if (contractsBills && contractsBills.length) {
            this.calcUnpaidBills();
            const operation = $event.currentTarget.checked ? 'add' : 'minus';
            this.checkboxes.forEach((element) => {
                if (element.nativeElement.getAttribute('data-type') !== 'true') {
                    element.nativeElement.checked = $event.currentTarget.checked;
                    if (operation === 'add') {
                        const total = element.nativeElement.getAttribute('data-value');
                        if (total) {
                            this.calcTotal(total, operation);
                        }
                    }
                }
            });
            contractsBills.forEach((contract) => {
                contract.bills.forEach((bill) => {
                    bill.checked = $event.currentTarget.checked
                });
            });
        }
    }

    toggleAddBills($event, contract) {
        if (contract && contract.bills) {
            const operation = $event.currentTarget.checked ? 'add' : 'minus';
            contract.bills.forEach((bill, i) => {
                if (!bill.isExigible) {
                    if (bill.checked) {
                        if (operation === 'minus') {
                            this.calcTotal(parseFloat(bill.solde), operation);
                        }
                    } else {
                        if (operation === 'add') {
                            this.calcTotal(parseFloat(bill.solde), operation);
                        }
                    }
                    bill.checked = $event.currentTarget.checked;
                }
            });
        }
    }

    toggleAddBill($event, bill) {
        const operation = $event.currentTarget.checked ? 'add' : 'minus';
        bill.checked = $event.currentTarget.checked;
        if (!bill.isExigible) {
            this.calcTotal(parseFloat(bill.solde), operation);
        }
    }

    pageChanged(page: number): void {
        this.page = page;
        this.getAllUnpaidBills();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.getAllUnpaidBills();
    }

    addBill(event, bill: any): void {
        if (event.target.checked) {
            this.total += parseFloat(bill.amount);
            this.selectedBills.push(bill);
        } else {
            this.total -= parseFloat(bill.amount);
            this.selectedBills.splice(this.selectedBills.indexOf(bill), 1);
        }
    }

    selectAll(event): void {
        if (event.target.checked) {
            this.total = this.totalUnpaid;
            // this.selectedBills = this.bills;
        } else {
            this.total = 0;
            // this.selectedBills = [];
        }
    }

    submit() {
        if (this.selectedBills.length !== 0) {
        }
    }

    cancel() {
        this.total = 0;
        this.selectedBills = [];
    }

}
