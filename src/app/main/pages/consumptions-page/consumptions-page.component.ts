import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonUtil} from '../../../core/helpers/common.util';
import { ContractsService } from '../../services/contracts.service';

import {UtilsService} from '../../services/utils.service';
import {FileModel} from '../../../core/models/file.model';
import {ServicesService} from '../../services/services.service';

@Component({
  selector: 'app-consumption-page',
  templateUrl: './consumptions-page.component.html',
  styleUrls: ['./consumptions-page.component.scss']
})
export class ConsumptionsPageComponent implements OnInit {
  contracts: any;
  minMaxForm: FormGroup;
  historyForm: FormGroup;
  releves: any;
  nextReleve: any;
  contractNumber: any;
  consumptions: any;
  minMax;
  meters: any;

  constructor(
              private contractServices: ContractsService,
              private adminService: AdminService,
              private utilsService: UtilsService,
              private formBuilder: FormBuilder,
              private servicesService: ServicesService) {
    this.minMaxForm = this.formBuilder.group({
      contract: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.historyForm = this.formBuilder.group({
      contract: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.minMax = [{'min': '0', 'max': '0'}];
    this.adminService.getContracts().subscribe(response => {
      this.contracts = response;
    });

    this.adminService.getReleves().subscribe(response => {
      this.releves = response;
    });

    this.adminService.getNextReleve().subscribe(response => {
      this.nextReleve = response[0].date;
    });

    this.adminService.getCompteur().subscribe(response => {
      this.meters = response;
    })
  }

  getConsumptionHistory() {
    this.adminService.getConsumptions(this.contractNumber).subscribe(response => {
      this.consumptions = response;
    })
  }

  getConsumptionReport() {
    this.utilsService.getConsumptionReport().subscribe(response => {
    })
  }

  getMinMax(contractId: any) {
    this.contractServices
      .getMinMaxConsumption(contractId)
      .subscribe(response => {this.minMax[0].min = response[0].min; this.minMax[0].max = response[0].max; }, err => {});
  }

  setContract(contractNumber: any) {
    this.contractNumber = contractNumber;
  }

  downloadXlsConsumptions() {
    /*
    this.servicesService.downloadXlsConsumptions().subscribe((response) => {
      if (response && response['body']) {
        const file = new FileModel('mes-consommations.xls', CommonUtil._arrayBufferToBase64(response['body']));

        CommonUtil.downloadFile(file);
      }
    });
    */
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
