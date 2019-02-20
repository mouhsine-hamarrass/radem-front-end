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
import * as _ from 'underscore';
import {BaseChartDirective, Color} from 'ng2-charts';
import {ContractAttachModel} from '../../models/contract-attach.model';
import {ContractModel} from '../../models/contract.model';
import {ConsumptionHistoryModel} from '../../models/consumptionHistory.model';
import {ConsumptionReportModel} from '../../models/consumptionReport.model';

@Component({
  selector: 'app-consumption-page',
  templateUrl: './consumptions-page.component.html',
  styleUrls: ['./consumptions-page.component.scss']
})
export class ConsumptionsPageComponent implements OnInit {
  @ViewChild('chart1') chart1: BaseChartDirective;
  @ViewChild('chart2') chart2: BaseChartDirective;
  public user: User;
  clientContracts: Array<ContractAttachModel>;
  contracts: Array<ContractModel>;
  historyForm: FormGroup;
  consumptionsHistory: Array<ConsumptionHistoryModel> = [];
  consumptionsHistoryCurrentYear: Array<ConsumptionHistoryModel> = [];
  consumptionsReport: Array<ConsumptionReportModel> = [];

  today: any = moment();
  minDate: any = moment().subtract(5, 'years');

  page = 1;
  pageSize = 0;
  numberOfItems: number;
  totalElements: number;
  totalPages: number;
  itemsPerPage: number;

  public chartType = 'bar';
  public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'];
  currentYear = moment().format('YYYY');
  lastYear = moment().subtract(1, 'years').format('YYYY');
  public chartDataSetsVolume: Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: this.currentYear.toString()},
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: this.lastYear.toString()}
  ];
  public chartDataSetsInvoice: Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: this.currentYear.toString()},
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: this.lastYear.toString()}
  ];
  public chartOptionsEau: any = {
    title: {
      display: true,
      text: 'Volume'
    },
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public chartOptionsFact: any = {
    title: {
      display: true,
      text: 'Facturation en DH'
    },
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
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
    private services: ServicesService) {
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
    this.getClientAttachedContracts();
  }


  refresh_chart() {
    /*
    setTimeout(() => {
      this.chartDataSetsVolume = [
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: this.currentYear.toString()},
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: this.lastYear.toString()}
      ];
      this.chartDataSetsInvoice = [
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: this.currentYear.toString()},
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: this.lastYear.toString()}
      ];
      this.chart.ngOnDestroy();
      this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
      if (this.chart && this.chart.chart && this.chart.chart.config) {
        this.chart.chart.update();
      }
    }, 100);
    */
  }

  getClientAttachedContracts() {
    this.services.clientAttachedContracts().subscribe(response => {
      this.clientContracts = response.data;
      if (this.clientContracts.length) {
        // this.setReportContract(this.clientContracts[0].contractNo);
      }
    }, err => {
      console.log(err)
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
        this.consumptionsHistory = response.data['content'];
        this.totalElements = response.data['totalElements'];
        this.totalPages = response.data['totalPages'];
        this.itemsPerPage = response.data['size'];
        this.numberOfItems = response.data['numberOfElements'];
      }, err => console.log(err));
  }

  getConsumptionHistoryCurrentYear(contractNo) {
    this.adminService.getPageableHistoryConsumptionsCurrentYear(contractNo)
      .subscribe(response => {
        this.consumptionsHistoryCurrentYear = response.data;
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

  getConsumptionReport(contractNo) {
    this.adminService.getConsumptionReport(contractNo).subscribe(response => {
      this.consumptionsReport = response.data;
      _.each(this.consumptionsReport, (consumption, i) => {

        _.each(consumption.volumes, (volume, j) => {
          this.chartDataSetsVolume[i].label = consumption.year;
          this.chartDataSetsVolume[i].data[j] = volume ? parseFloat(volume) : 0;
        });

        _.each(consumption.amounts, (amount, j) => {
          this.chartDataSetsInvoice[i].label = consumption.year;
          this.chartDataSetsInvoice[i].data[j] = amount ? parseFloat(amount) : 0;
        });

      });
      console.log(this.chartDataSetsVolume);
      console.log(this.chartDataSetsInvoice);

      this.chart1.ngOnChanges({});
      this.chart2.ngOnChanges({});
    }, error => {
      console.log(error)
    })
  }

  setHistoryContract() {
    this.getConsumptionHistory();
  }

  setReportContract(contractNo: string) {
    this.getConsumptionReport(contractNo);
    this.getConsumptionHistoryCurrentYear(contractNo);
  }

  downloadXlsConsumptions() {
    const contract = this.historyForm.controls['contract'].value;
    const startDate = moment(new Date(this.historyForm.controls['startDate'].value));
    const endDate = moment(new Date(this.historyForm.controls['endDate'].value));
    this.services.downloadXlsConsumptions(contract, startDate, endDate).subscribe((response) => {
      if (response && response['body']) {
        const file = new FileModel('mes-consommations.xls', CommonUtil._arrayBufferToBase64(response['body']));

        CommonUtil.downloadFile(file);
      }
    });
  }

  downloadPdfConsumptions() {
    const contract = this.historyForm.controls['contract'].value;
    const startDate = moment(new Date(this.historyForm.controls['startDate'].value));
    const endDate = moment(new Date(this.historyForm.controls['endDate'].value));
    this.services.downloadPdfConsumptions(contract, startDate, endDate).subscribe((response) => {
      if (response && response['body']) {
        const file = new FileModel('mes-consommations.pdf', CommonUtil._arrayBufferToBase64(response['body']));

        CommonUtil.downloadFile(file);
      }
    });
  }
}
