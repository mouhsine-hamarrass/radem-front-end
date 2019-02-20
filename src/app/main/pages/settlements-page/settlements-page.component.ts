import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {UtilsService} from '../../services/utils.service';
import {FileModel} from '../../../core/models/file.model';
import {CommonUtil} from '../../../core/helpers/common.util';
import {ServicesService} from '../../services/services.service';
import {ContractsService} from '../../services/contracts.service';
import {User} from '../../models/user.model';
import {AuthHelper} from '../../../core/services/security/auth.helper';
import {ContractAttachModel} from '../../models/contract-attach.model';
import * as moment from 'moment';
import {SettlementModel} from '../../models/settlement.model';

@Component({
    selector: 'app-settlements',
    templateUrl: './settlements-page.component.html',
    styleUrls: ['./settlements-page.component.scss']
})
export class SettlementsPageComponent implements OnInit {
    public user: User;
    clientContracts: Array<ContractAttachModel>;
    public settlements: Array<SettlementModel>;
    public contractId: any;
    public date: Date;
    public contractForm: FormGroup;

    today: any = moment();
    minDate: any = moment().subtract(5, 'years');

    page = 1;
    pageSize = 0;
    totalElements: number;
    totalPages: number;
    numberOfItems: number;
    itemsPerPage: number;
    sort: any;
    filter: any;

    constructor(private contractServices: ContractsService,
                private adminService: AdminService,
                private formBuilder: FormBuilder,
                private utilsService: UtilsService,
                private services: ServicesService) {
        this.contractForm = this.formBuilder.group({
            contract: ['', Validators.required],
            startDate: [this.today, Validators.required],
            endDate: [this.today, Validators.required]
        });
    }

    ngOnInit() {
        if (localStorage.getItem(AuthHelper.USER_ID)) {
            this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
        }
        this.getClientAttachedContracts();
    }

    getClientAttachedContracts() {
        this.services.clientAttachedContracts().subscribe(response => {
            this.clientContracts = response.data;
            if (this.clientContracts.length) {
                this.setContract(this.clientContracts[0].contractNo);
            }
        }, err => {
            console.log(err)
        });
    }

    onSorted(sort: any): void {
        this.sort = sort;
        this.getSettlements();
    }

    onFiltred(filter: any): void {
        this.filter = filter;
        this.getSettlements();
    }

    getSettlements() {
        const contract = this.contractForm.controls['contract'].value;
        const startDate = moment(new Date(this.contractForm.controls['startDate'].value));
        const endDate = moment(new Date(this.contractForm.controls['endDate'].value));
        this.adminService.getPageableSettlements(contract,
            startDate,
            endDate,
            this.page, this.pageSize)
            .subscribe(response => {
                this.settlements = response.data['content'];
                this.totalElements = response.data['totalElements'];
                this.totalPages = response.data['totalPages'];
                this.itemsPerPage = response.data['size'];
                this.numberOfItems = response.data['numberOfElements'];
            }, err => {
            });
    }

    pageChanged(page: number): void {
        this.page = page;
        this.getSettlements();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.getSettlements();
    }

    recherche() {
        /*
        this.contractServices.getSettlementsByContract(this.contractId).subscribe(response => {
            this.settlements = response;
        })
        */
    }

    setContract(id: any) {
        this.contractId = id;
    }

    getConsumptionReport() {
        this.utilsService.getSettlementsReport().subscribe(response => {
            console.log(response);
        })
    }

    downloadXlsSettlements() {
        /*
        this.services.downloadXlsSettlements().subscribe((response) => {
          if (response && response['body']) {
            const file = new FileModel('mes-reglements.xls', CommonUtil._arrayBufferToBase64(response['body']));

            CommonUtil.downloadFile(file);
          }
        });
        */
    }

    downloadPdfSettlements() {
      const contract = this.contractForm.controls['contract'].value;
      const startDate = moment(new Date(this.contractForm.controls['startDate'].value));
      const endDate = moment(new Date(this.contractForm.controls['endDate'].value));
        this.services.downloadPdfSettlements(contract, startDate, endDate).subscribe((response) => {
            if (response && response['body']) {
                const file = new FileModel('mes-reglements.pdf', CommonUtil._arrayBufferToBase64(response['body']));

                CommonUtil.downloadFile(file);
            }
        });
    }
}
