import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {ServicesService} from '../../../services/services.service';
import {ContractAttachModel} from '../../../models/contract-attach.model';
import * as moment from 'moment';
import {ReleveModel} from '../../../models/releve.model';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {Setting} from '../../../models/setting.model';
import * as _ from 'underscore';
import {DynamicModel} from '../../../models/dynamic.model';

@Component({
    selector: 'app-auto-reports',
    templateUrl: './auto-reports.component.html',
    styleUrls: ['./auto-reports.component.scss']
})
export class AutoReportsComponent implements OnInit {
    public reportForm: FormGroup;
    clientContracts: Array<ContractAttachModel>;
    public contractId: any;
    public selectedContract: string;
    today: any = moment();
    minDate: any = moment().subtract(5, 'years');
    releve: ReleveModel;
    dynamic: DynamicModel;
    private clientDetails: any;
    hideErrorBigValue = false;
    private indexConducteur: string;
    private indexDisable: number;

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
            index: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.getAdvice();
        this.getClientAttachedContracts();

    }

    setContract(id: any) {
        localStorage.setItem('SELECTED_CONTRACT', id);
        this.contractId = id;
        this.getReleve();
        this.services.getClientDetailsByContractNo(id).subscribe(response => {
            this.clientDetails = response.data;
            if (this.indexDisable === 1) {
                this.hideErrorBigValue = true;
            }
            console.log(this.clientDetails);
        }, err => {
            console.log(err)
        });
    }

    getClientAttachedContracts() {
        this.services.clientAttachedContracts().subscribe(response => {
            this.clientContracts = response.data;
            if (this.clientContracts && this.clientContracts.length) {
                this.contractId = this.clientContracts[0].contractNo;
                const clientContractsNo = _.pluck(this.clientContracts, 'contractNo');
                const savedContractNo = localStorage.getItem('SELECTED_CONTRACT');
                if (savedContractNo && clientContractsNo.includes(savedContractNo)) {
                    this.contractId = localStorage.getItem('SELECTED_CONTRACT');
                }
                this.setContract(this.contractId);

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
            // this.today = this.releve.dateReading;
            this.id.setValue(this.releve.id);
            this.contract.setValue(this.releve.contractNo);

            this.index.setValue(this.releve.indexValue);
            this.indexConducteur = this.releve.indexValue;
            this.index.setValidators([Validators.min(this.index.value), Validators.required]);

            this.checkDate.setValue(new Date(this.releve.dateReading));
            this.hideErrorBigValue = false;

        } else {
            this.id.setValue(null);
            this.contract.setValue(this.contract.value);
            this.index.setValue('');
            this.checkDate.setValue('');
            this.hideErrorBigValue = true;
        }
    }

    getReleve() {
        if (this.contractId) {
            this.services.loadMeter(this.contractId).subscribe(response => {
                this.releve = response.data;
                this.loadReleve();
            });
        }
    }

    saveReleve() {
        if (Number(this.indexConducteur) < this.reportForm.controls.index.value) {
            this.releve = new ReleveModel(
                this.reportForm.controls.id.value,
                this.reportForm.controls.index.value,
                this.reportForm.controls.checkDate.value,
                this.reportForm.controls.contract.value);
            if (this.releve.contractNo && this.releve.dateReading && this.releve.indexValue) {
                this.services.autoMeterRead(this.releve).subscribe(response => {
                    this.toastrService.success(this.translate.instant('MODIFIED_RELEVE'), '');
                }, error1 => {
                    console.log(error1)
                });
            } else {
                this.toastrService.error(this.translate.instant('ERROR_FORM'), '');
            }
        }
    }

    getAdvice() {
        this.adminService.getDynamicContent('conseil').subscribe(
            response => {
                this.dynamic = response.data;
            }, err => {
                console.log(err)
            });
    }

}
