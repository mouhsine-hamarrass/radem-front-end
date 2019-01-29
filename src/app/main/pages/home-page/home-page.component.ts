import {Component, OnInit, TemplateRef} from '@angular/core';
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


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    public user: User;
    advices: Setting;
    userContracts: any;
    modalRef: BsModalRef;
    config = {
        backdrop: true,
        ignoreBackdropClick: false,
        class: 'modal-lg'
    };
    formLinkContract: FormGroup;
    private modalOptions = <ModalOptions>{backdrop: true, ignoreBackdropClick: false, class: 'modal-lg'};

    constructor(
        private contractServices: ContractsService,
        private adminServices: AdminService,
        private profileService: ProfileService,
        private homeService: HomeService,
        private formBuilder: FormBuilder,
        private modalService: BsModalService,
        private translate: TranslateService) {
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
        this.getClientContracts()
    }

    getClientContracts() {
        this.adminServices.getAllContractByNumClient().subscribe(response => {
            this.userContracts = response.data;
        });
    }

    setContract(contractNumber: any) {

    }

    openModalLinkContract(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.modalOptions);
    }

    linkMyContract(formValues) {
        this.formLinkContract.reset();
        this.modalRef.hide();
    }

    getAdvice() {
        this.adminServices.getAdvices().subscribe(
            response => {
                this.advices = response.data;
            },
            err => {
                console.log(err);
            }
        );
    }

}
