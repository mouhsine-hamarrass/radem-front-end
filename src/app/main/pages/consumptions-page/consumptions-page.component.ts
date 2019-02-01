import {Component, OnInit, ViewChild} from '@angular/core';
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
import {Color} from 'ng2-charts';

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

    today: any = moment();
    minDate: any = moment().subtract(5, 'years');

    page = 1;
    pageSize = 0;
    numberOfItems: number;
    totalElements: number;
    totalPages: number;
    itemsPerPage: number;

    public chartType = 'bar';
    public chartConsoTitle = 'Volume en m3';
    public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'];
    public chartDatasetsEau: Array<any> = [
        {data: [65, 59, 80, 81, 56, 70, 40, 30, 20, 15, 68], label: '2017'},
        {data: [28, 48, 40, 19, 86, 27, 90, 60, 25, 15, 80], label: '2018'}
    ];
    public chartDatasetsFact: Array<any> = [
        {data: [65, 59, 80, 81, 56, 70, 40, 30, 20, 15, 68], label: '2017'},
        {data: [28, 48, 40, 19, 86, 27, 90, 60, 25, 15, 80], label: '2018'}
    ];
    public chartOptionsEau: any = {
        title: {
            display: true,
            text: 'Volume'
        },
        responsive: true
    };
    public chartOptionsFact: any = {
        title: {
            display: true,
            text: 'Facturation en DH'
        },
        responsive: true
    };
    private WaterBar1: Color = {
        backgroundColor: 'rgba(151,187,205, 1)',
        borderWidth: 1,
        borderColor: 'rgba(151,187,205,1)',
        pointBackgroundColor: 'rgba(151,187,205,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(220,220,220,1)'
    };
    private WaterBar2: Color = {
        backgroundColor: 'rgba(180, 228, 250, 1)',
        borderWidth: 1,
        borderColor: 'rgba(180, 228, 250,1)',
        pointBackgroundColor: 'rgba(180, 228, 250,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(151,187,205,1)'
    };
    public chartColorsEau: Array<any> = [
        this.WaterBar1,
        this.WaterBar2
    ];
    private FactBar1: Color = {
        backgroundColor: 'rgba(102,205,170, 1)',
        borderWidth: 1,
        borderColor: 'rgba(102,205,170, 1)',
        pointBackgroundColor: 'rgba(231, 76, 60,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(231, 76, 60, 1)'
    };
    private FactBar2: Color = {
        backgroundColor: 'rgba(163,225,204, 1)',
        borderWidth: 1,
        borderColor: 'rgba(163,225,204, 1)',
        pointBackgroundColor: 'rgba(151,187,205,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(151,187,205,1)'
    };
    public chartColorsFact: Array<any> = [
        this.FactBar1,
        this.FactBar2
    ];

    constructor(
        private contractServices: ContractsService,
        private adminService: AdminService,
        private utilsService: UtilsService,
        private formBuilder: FormBuilder,
        private servicesService: ServicesService) {
        this.historyForm = this.formBuilder.group({
            contract: ['', Validators.required],
            startDate: [this.today, Validators.required],
            endDate: [this.today, Validators.required]
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


    getConsumptionHistory() {
        const contract = this.historyForm.controls['contract'].value;
        const startDate = moment(new Date(this.historyForm.controls['startDate'].value));
        const endDate = moment(new Date(this.historyForm.controls['endDate'].value));
        this.adminService.getPageableHistoryConsumptions(contract,
            startDate,
            endDate,
            this.page,
            this.pageSize)
            .subscribe(response => {
                this.consumptions = response.data['content'];
                this.totalElements = response.data['totalElements'];
                this.totalPages = response.data['totalPages'];
                this.itemsPerPage = response.data['size'];
                this.numberOfItems = response.data['numberOfElements'];
                console.log(response.data);
            }, err => console.log(err));
    }


    pageChanged(pageNo: number) {
        this.page = pageNo;
        this.getConsumptionHistory();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
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
