import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServicesService} from '../../services/services.service';
import {CommonUtil} from '../../../core/helpers/common.util';
import {FileModel} from '../../../core/models/file.model';

@Component({
  selector: 'app-consumption-page',
  templateUrl: './consumption-page.component.html',
  styleUrls: ['./consumption-page.component.scss']
})
export class ConsumptionPageComponent implements OnInit {
  contracts: any;
  minMaxForm: FormGroup;
  historyForm: FormGroup;
  releves?: any;
  nextReleve?: any;
  contractNumber: any;
  Consumptions: any;
  minMax;
  meters: any;

  constructor(private adminService: AdminService,
              private servicesService: ServicesService,
              private formBuilder: FormBuilder) {
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
    this.minMax = [{'min': '0', 'max': '0'}]
    this.adminService.getContracts().subscribe(response => {
      this.contracts = response;
    })

    this.adminService.getReleves().subscribe(response => {
      this.releves = response;
    })

    this.adminService.getNextReleve().subscribe(response => {
      try {
        this.nextReleve = response[0].date;
      } catch (e) {

      }
    });

    this.adminService.getCompteur().subscribe(response => {
      this.meters = response;
    })
  }

  getConsumptionHistory() {
    this.adminService.getConsumptions(this.contractNumber).subscribe(response => {
      this.Consumptions = response;
    });
  }

  getMinMax(contractNumber: any) {
    console.log(contractNumber);
    this.adminService.getMinMaxConsumption(contractNumber).subscribe(response => {
      this.minMax = response;
      console.log(this.minMax);
    })
  }

  setContract(contractNumber: any) {
    this.contractNumber = contractNumber;
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
