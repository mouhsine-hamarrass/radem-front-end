import {Component, OnInit, TemplateRef} from '@angular/core';
import {ContractsService} from '../../services/contracts.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';
import {AdminService} from '../../services/admin.service';
import * as _ from 'underscore';
import {User} from '../../models/user.model';
import {AuthHelper} from '../../../core/services/security/auth.helper';
import * as moment from 'moment';
import {environment} from '../../../../environments/environment';
import {ContractModel} from '../../models/contract.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';
import {ServicesService} from '../../services/services.service';


@Component({
    selector: 'app-contracts-page',
    templateUrl: './contracts-page.component.html',
    styleUrls: ['./contracts-page.component.scss']
})
export class ContractsPageComponent implements OnInit {

    public user: User;
    public contracts: Array<ContractModel>;
    public contract: ContractModel;

    formLinkContract: FormGroup;

    values: any;
    solde: any;
    history: any;
    subscriptions;
    subscription: Array<any> = [];
    bills;
    bill;
    modalRef: BsModalRef;
    config = {
        backdrop: true,
        ignoreBackdropClick: false,
        class: 'modal-lg'
    };

    page = 1;
    pageSize = 0;
    totalElements: number;
    totalPages: number;
    numberOfItems: number;
    itemsPerPage: number;
    sort: any;
    filter: any;

    private modalOptions = <ModalOptions>{backdrop: true, ignoreBackdropClick: false, class: 'modal-lg'};

    constructor(private modalService: BsModalService,
                private formBuilder: FormBuilder,
                private translate: TranslateService,
                private contractsServices: ContractsService,
                private services: ServicesService
    ) {
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
        this.getContractList();
    }

    onSorted(sort: any): void {
        this.sort = sort;
        this.getContractList();
    }

    onFiltred(filter: any): void {
        this.filter = filter;
        this.getContractList();
    }

    getContractList() {
        this.contractsServices.getPageableContracts(this.page, this.pageSize)
            .subscribe(response => {
                _.each(response.data['content'], (contract: ContractModel) => {
                    contract.dateEffetAbonnement =
                        moment(new Date(contract.dateEffetAbonnement)).format(environment.defaultDateFormatNoTime);
                    contract.dateFinAbonnement =
                        moment(new Date(contract.dateFinAbonnement)).format(environment.defaultDateFormatNoTime);
                });
                this.contracts = response.data['content'];
                this.totalElements = response.data['totalElements'];
                this.totalPages = response.data['totalPages'];
                this.itemsPerPage = response.data['size'];
                this.numberOfItems = response.data['numberOfElements'];
            }, error => {
                console.log(error);
            });
    }

    openModalLinkContract(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.modalOptions);
    }

    linkMyContract(formValues) {
        this.formLinkContract.reset();
        this.modalRef.hide();
    }

    unLinkMyContract(contractNo) {
        swal({
            title: this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_CONTINUE'),
            text: this.translate.instant('THIS_ACTION_IS_IRREVERSIBLE'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this.translate.instant('YES_I_AM_SURE')
        }).then((result) => {
            if (result.value) {
                this.services.detachContract(contractNo).subscribe(response => {
                    if (response.data) {
                        this.getContractList();
                    }
                }, error => {
                    console.log(error)
                });
            }
        });
    }

    pageChanged(page: number): void {
        this.page = page;
        this.getContractList();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.getContractList();
    }

    openContractDetails(template: TemplateRef<any>, numContract: string) {
        if (numContract && numContract !== null) {
            this.contractsServices.getDetailsContract(numContract).subscribe(responseContract => {
                this.contractsServices.getSoldeByNumContract(numContract).subscribe(responseSolde => {
                    this.contract = responseContract.data;
                    if (this.contract) {
                        this.contract.dateCreationAbonnement =
                            moment(new Date(this.contract.dateCreationAbonnement)).format(environment.defaultDateFormatNoTime);
                        this.contract.dateEffetAbonnement =
                            moment(new Date(this.contract.dateEffetAbonnement)).format(environment.defaultDateFormatNoTime);
                        this.contract.dateFinAbonnement =
                            moment(new Date(this.contract.dateFinAbonnement)).format(environment.defaultDateFormatNoTime);
                    }
                    this.solde = {
                        soldeExigible: responseSolde.data['soldeExigible'] || 0,
                        soldetot: responseSolde.data['soldetot'] || 0
                    };

                    this.modalRef = this.modalService.show(template, this.config);
                }, error => console.log(error));
            }, err => console.log(err));
        }
    }

}
