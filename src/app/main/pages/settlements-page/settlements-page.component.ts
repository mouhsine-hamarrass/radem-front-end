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

@Component({
    selector: 'app-settlements',
    templateUrl: './settlements-page.component.html',
    styleUrls: ['./settlements-page.component.scss']
})
export class SettlementsPageComponent implements OnInit {
    public user: User;
    public settlements: any;
    public contracts: any;
    public contractId: any;
    public date: Date;
    public contractForm: FormGroup;

    page = 1;
    pageSize = 0;
    totalElements: number;
    totalPages: number;
    numberOfItems: number;
    itemsPerPage: number;
    sort: any;
    filter: any;

    constructor(private adminService: ContractsService,
                private formBuilder: FormBuilder,
                private utilsService: UtilsService,
                private servicesService: ServicesService) {
        this.contractForm = this.formBuilder.group({
            contract: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required]
        });
    }

    get contract() {
        return this.contractForm.get('contract');
    }

    get startdate() {
        return this.contractForm.get('startDate');
    }

    get endDate() {
        return this.contractForm.get('endDate');
    }

    ngOnInit() {
        if (localStorage.getItem(AuthHelper.USER_ID)) {
            this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
            this.user.clientNo = '0012566'; // TODO to remove after
        }
        this.getContacts();
    }

    onSorted(sort: any): void {
        this.sort = sort;
        this.getContacts();
    }

    onFiltred(filter: any): void {
        this.filter = filter;
        this.getContacts();
    }

    getContacts() {
        this.adminService.getPageableContracts(this.user.clientNo, this.page, this.pageSize, this.filter, this.sort)
            .subscribe(response => {
                this.contracts = response.data['content'];
                this.totalElements = response.data['totalElements'];
                this.totalPages = response.data['totalPages'];
                this.itemsPerPage = response.data['size'];
                this.numberOfItems = response.data['numberOfElements'];
            }, err => {
            });
    }

    pageChanged(page: number): void {
        this.page = page;
        this.getContacts();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.getContacts();
    }

    recherche() {
        /*
        this.adminService.getSettlementsByContract(this.contractId).subscribe(response => {
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
        this.servicesService.downloadXlsSettlements().subscribe((response) => {
          if (response && response['body']) {
            const file = new FileModel('mes-reglements.xls', CommonUtil._arrayBufferToBase64(response['body']));

            CommonUtil.downloadFile(file);
          }
        });
        */
    }

    downloadPdfSettlements() {
        this.servicesService.downloadPdfSettlements().subscribe((response) => {
            if (response && response['body']) {
                const file = new FileModel('mes-reglements.pdf', CommonUtil._arrayBufferToBase64(response['body']));

                CommonUtil.downloadFile(file);
            }
        });
    }
}
