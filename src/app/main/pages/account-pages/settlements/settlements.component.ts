import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {CommonUtil} from '../../../../core/helpers/common.util';
import {ServicesService} from '../../../services/services.service';
import {FileModel} from '../../../../core/models/file.model';

@Component({
  selector: 'app-settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.scss']
})
export class SettlementsComponent implements OnInit {
  public settlements: any;
  public contracts: any;
  public contractId: any;
  public date: Date;
  public contractForm: FormGroup;

  constructor(private adminService: AdminService,
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
    this.adminService.getContracts().subscribe(response => {
      this.contracts = response;
    })
  }

  recherche() {
    this.adminService.getSettlementsByContract(this.contractId).subscribe(response => {
      this.settlements = response;
    })
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
    this.servicesService.downloadXlsSettlements().subscribe((response) => {
      if (response && response['body']) {
        const file = new FileModel('mes-reglements.xls', CommonUtil._arrayBufferToBase64(response['body']));

        CommonUtil.downloadFile(file);
      }
    });
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
