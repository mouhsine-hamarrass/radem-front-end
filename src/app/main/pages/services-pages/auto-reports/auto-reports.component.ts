import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {ServicesService} from '../../../services/services.service';
import {ContractAttachModel} from '../../../models/contract-attach.model';
import * as moment from 'moment';
import {ReleveModel} from '../../../models/releve.model';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-auto-reports',
  templateUrl: './auto-reports.component.html',
  styleUrls: ['./auto-reports.component.scss']
})
export class AutoReportsComponent implements OnInit {
  public reportForm: FormGroup;
  clientContracts: Array<ContractAttachModel>;
  public contractId: any;
  today: any = moment();
  minDate: any = moment().subtract(5, 'years');
  releve: ReleveModel;

  constructor(private adminService: AdminService,
              private services: ServicesService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private translate: TranslateService) {
    this.today = moment();
    this.reportForm = this.formBuilder.group({
      id: [''],
      contract: ['', Validators.required],
      checkDate: ['', Validators.required],
      index: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getClientAttachedContracts();

  }

  setContract(id: any) {
    this.contractId = id;
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

  get id() {
    return this.reportForm.get('id');
  }

  get contract() {
    return this.reportForm.get('contract');
  }

  get index() {
    return this.reportForm.get('index');
  }

  get checkDate() {
    return this.reportForm.get('checkDate');
  }


  loadReleve() {
    if (this.releve) {
      this.today = this.releve.dateReading;
      this.id.setValue(this.releve.id);
      this.contract.setValue(this.releve.contractNo);

      this.index.setValue(this.releve.indexValue);

      this.checkDate.setValue(new Date(this.releve.dateReading));


    } else {
      this.id.setValue(null);
      this.contract.setValue(this.contract.value);
      this.index.setValue('');
      this.checkDate.setValue('');

    }
  }

  getReleve() {
    if (this.contract !== null) {
      this.services.loadMeter(this.contract.value).subscribe(response => {
        this.releve = response.data;
        this.loadReleve();
      });
    }
  }


  saveReleve() {
    console.log(2);
    this.releve = new ReleveModel(
      this.reportForm.controls.id.value,
      this.reportForm.controls.index.value,
      this.reportForm.controls.checkDate.value,
      this.reportForm.controls.contract.value);

    this.services.autoMeterRead(this.releve).subscribe(response => {
      this.toastrService.success(this.translate.instant('MODIFIED_RELEVE'), '');
    }, error1 => {
      console.log(error1)
    });

  }
}
