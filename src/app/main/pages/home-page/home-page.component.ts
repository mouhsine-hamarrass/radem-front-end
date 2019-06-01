import {Component, ElementRef, OnInit, TemplateRef, ViewChild, Output, EventEmitter} from '@angular/core';
import {ContractsService} from '../../services/contracts.service';
import {HomeService} from '../../services/home.service';
import {AdminService} from '../../services/admin.service';
import {ProfileService} from '../../services/profile.service';

import {TranslateService} from '@ngx-translate/core';
import {Setting} from '../../models/setting.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';
import {User} from '../../models/user.model';
import {AuthHelper} from '../../../core/services/security/auth.helper';
import {ServicesService} from '../../services/services.service';
import {ContractAttachModel} from '../../models/contract-attach.model';
import {LastIndexNextVisitModel} from '../../models/last-index-next-visit.model';
import {LastInvoiceModel} from '../../models/last-invoice.model';
import {LastPaymentModel} from '../../models/last-payment.model';
import {SendContractModel} from '../../models/SendContract.model';


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    @ViewChild('contractDropDown') contractDropDown: ElementRef;
    public user: User;
    advices: Setting;
    clientContracts: Array<ContractAttachModel>;
    clientDetails: any;
    unpaidBalance = '0.00';
    selectedContract: string;
    lastVisitLastIndexDetails: LastIndexNextVisitModel;
    lastInvoice: LastInvoiceModel;
    lastPayment: LastPaymentModel;
    attachContractRequest: any;

    contractSending: SendContractModel;

    modalRef: BsModalRef;
    config = {
        backdrop: true,
        ignoreBackdropClick: false,
        class: 'modal-lg'
    };
    months = ['Janv.', 'Févr.', 'Mars.', 'Avr.', 'Mai.', 'Juin.', 'Juil.', 'Août.', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
    formLinkContract: FormGroup;
    private modalOptions = <ModalOptions>{backdrop: true, ignoreBackdropClick: false, class: 'modal-lg'};


    constructor(
        private contractServices: ContractsService,
        private adminServices: AdminService,
        private services: ServicesService,
        private profileService: ProfileService,
        private homeService: HomeService,
        private formBuilder: FormBuilder,
        private modalService: BsModalService,
        private translate: TranslateService) {
        this.attachContractRequest = {
            status: undefined,
            message: undefined
        };
        this.formLinkContract = this.formBuilder.group({
            numeroContrat: ['', Validators.required],
            numeroFacture: ['', Validators.required],
            month: ['', Validators.required]
        });

    }


    ngOnInit() {
        if (localStorage.getItem(AuthHelper.USER_ID)) {
            this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
        }
        this.getAdvice();
        this.getClientAttachedContracts()
    }

    getClientAttachedContracts() {
        this.services.clientAttachedContracts().subscribe(response => {
            this.clientContracts = response.data;
            if (this.clientContracts.length) {
                this.selectedContract = this.clientContracts[0].contractNo;
                this.setContract(this.clientContracts[0].contractNo);
            }
        }, err => {
            console.log(err)
        });
    }

    openModalLinkContract(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.modalOptions);
    }

    closeModal() {
        this.formLinkContract.reset();
        this.modalRef.hide();
        this.attachContractRequest.status = undefined;
    }

    linkMyContract(formData) {
        const contract = {
            contractNo: formData.numeroContrat,
            invoiceNo: formData.numeroFacture,
            month: formData.month,
        };
        this.services.attachContract(contract.contractNo, contract.invoiceNo, contract.month).subscribe(response => {
            if (response.data) {
                this.attachContractRequest.status = 'success';
                this.attachContractRequest.message = this.translate.instant('CONTRACT_ATTACHABLE');
                this.getClientAttachedContracts();
            } else {
                this.attachContractRequest.status = 'warning';
                this.attachContractRequest.message = this.translate.instant('CONTRACT_UNATTACHABLE');
            }
        }, err => {
            this.attachContractRequest.status = undefined;
            console.log(err)
        });
    }


    setContract(contractNo: string) {
        this.getClientDetailsByContract(contractNo);
        this.getUnpaidBalanceByContract(contractNo);
        this.getLastVisitLastIndexByContract(contractNo);
        this.getLastInvoiceByContract(contractNo);
        this.getLastPaymentByContract(contractNo);
        this.contractSending.contractNo = contractNo;
        // this.messageEvent.emit(this.contractSending)
    }

    getClientDetailsByContract(contractNo: string) {
        this.services.getClientDetailsByContractNo(contractNo).subscribe(response => {
            this.clientDetails = response.data;
            console.log(this.clientDetails);
        }, err => {
            console.log(err)
        });
    }

    getUnpaidBalanceByContract(contractNo: string) {
        this.services.getUnpaidBalanceByContractNo(contractNo).subscribe(response => {
            this.unpaidBalance = response.data;
        }, err => {
            console.log(err)
        });
    }

    getLastVisitLastIndexByContract(contractNo: string) {
        this.services.getLastVisitLastIndexByContractNo(contractNo).subscribe(response => {
            this.lastVisitLastIndexDetails = response.data;
        }, err => {
            console.log(err)
        });
    }

    getLastInvoiceByContract(contractNo: string) {
        this.services.getLastInvoiceByContractNo(contractNo).subscribe(response => {
            this.lastInvoice = response.data;
        }, err => {
            console.log(err)
        });
    }

    getLastPaymentByContract(contractNo: string) {
        this.services.getLastPaymentByContractNo(contractNo).subscribe(response => {
            this.lastPayment = response.data;
        }, err => {
            console.log(err)
        });
    }

    getAdvice() {
        this.adminServices.getAdvices().subscribe(
            response => {
                this.advices = response.data;
            }, err => {
                console.log(err)
            });
    }


}
