import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonUtil} from '../../../core/helpers/common.util';
import {ContractsService} from '../../services/contracts.service';

import {UtilsService} from '../../services/utils.service';
import {FileModel} from '../../../core/models/file.model';
import {ServicesService} from '../../services/services.service';
import {User} from '../../models/user.model';
import {AuthHelper} from '../../../core/services/security/auth.helper';
import * as moment from 'moment';
import {ConsumptionModel} from '../../models/consumption.model';

@Component({
    selector: 'app-consumption-page',
    templateUrl: './consumptions-page.component.html',
    styleUrls: ['./consumptions-page.component.scss']
})
export class ConsumptionsPageComponent implements OnInit {
    public user: User;
    userContracts: any;
    contracts: any;
    historyForm: FormGroup;
    contractNumber: any;
    consumptions: Array<ConsumptionModel>;
    meters: any;

    pageConsumption = 1;
    pageSizeConsumption = 0;
    numberOfItemsConsumption: number;
    totalElementsConsumption: number;
    totalPagesConsumption: number;
    itemsPerPageConsumption: number;
    sortConsumption: any;
    filterConsumption: any;

    constructor(
        private contractServices: ContractsService,
        private adminService: AdminService,
        private utilsService: UtilsService,
        private formBuilder: FormBuilder,
        private servicesService: ServicesService) {
        this.historyForm = this.formBuilder.group({
            contract: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required]
        });
    }

    ngOnInit() {
        if (localStorage.getItem(AuthHelper.USER_ID)) {
            this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
        }
        this.getClientContracts();
    }

    getClientContracts() {
        this.adminService.getAllContractByNumClient().subscribe(response => {
            this.userContracts = response.data;
        });
    }

    getCounter() {
        this.adminService.getCompteur().subscribe(response => {
            this.meters = response.data;
        })
    }

    getConsumptionHistory() {
        const contract = this.historyForm.controls['contract'].value;
        const startDate = moment(new Date(this.historyForm.controls['startDate'].value));
        const endDate = moment(new Date(this.historyForm.controls['endDate'].value));
        this.adminService.getPageableHistoryConsumptions(contract,
            startDate,
            endDate,
            this.pageConsumption,
            this.pageSizeConsumption)
            .subscribe(response => {
                // this.consumptions = response.data['content'];
                this.consumptions = response.data;
                this.totalElementsConsumption = response.data['totalElements'];
                this.totalPagesConsumption = response.data['totalPages'];
                this.itemsPerPageConsumption = response.data['size'];
                this.numberOfItemsConsumption = response.data['numberOfElements'];
                console.log(this.consumptions);
            }, err => console.log(err));
    }


    onSortedConsumption(sort: any): void {
        this.sortConsumption = sort;
        this.getConsumptionHistory();
    }

    onFiltredConsumption(filter: any): void {
        this.filterConsumption = filter;
        this.getConsumptionHistory();
    }

    pageChangedConsumption(pageNo: number) {
        this.pageConsumption = pageNo;
        this.getConsumptionHistory();
    }

    pageFilterConsumption(pageSize: number): void {
        this.pageSizeConsumption = pageSize;
        this.itemsPerPageConsumption = pageSize;
        this.pageConsumption = 1;
        this.getConsumptionHistory();
    }


    getConsumptionReport() {
        this.utilsService.getConsumptionReport().subscribe(response => {
        })
    }

    setContract(contractNumber: any) {
        this.contractNumber = contractNumber;
        // this.getConsumptionHistory();
    }

    downloadXlsConsumptions() {
        this.servicesService.downloadXlsConsumptions().subscribe((response) => {
            if (response && response['body']) {
                const file = new FileModel('mes-consommations.xls', CommonUtil._arrayBufferToBase64(response['body']));

                CommonUtil.downloadFile(file);
            }
        });
    }

    downloadPdfConsumptions() {
        this.servicesService.downloadPdfConsumptions().subscribe((response) => {
            if (response && response['body']) {
                const file = new FileModel('mes-consommations.pdf', CommonUtil._arrayBufferToBase64(response['body']));

                CommonUtil.downloadFile(file);
            }
        });
    }
}
