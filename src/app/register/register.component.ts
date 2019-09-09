import {Component, OnInit, ViewEncapsulation, TemplateRef, Renderer2} from '@angular/core';
import {AdminService} from '../main/services/admin.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EnableAccountService} from '../main/services/enable-account.service';
import {Router} from '@angular/router';
import {RegistrationQuestionModel} from '../main/models/registration-question.model';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';
import {PasswordMatchDirective} from '../shared/directives/password-match.directive';
import {environment} from '../../environments/environment';
import {User} from '../main/models/user.model';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {ContractAttachModel} from '../main/models/contract-attach.model';
import {ServicesService} from '../main/services/services.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
    method = 'BILL';
    months = ['Janv.', 'Févr.', 'Mars.', 'Avr.', 'Mai.', 'Juin.', 'Juil.', 'Août.', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

    attachContractRequest: any;

    modalRef: BsModalRef;

    firstStep: FormGroup;
    secondStep: FormGroup;
    thirdStep: FormGroup;

    checkbox = false;
    ref: any;
    user: any;
    clientRecap: any;
    registrationQuestions: Array<RegistrationQuestionModel> = [];
    emailPattern: string;
    basicContractDto: ContractAttachModel;
    private modalOptions = <ModalOptions>{backdrop: true, ignoreBackdropClick: false, class: 'modal-lg'};
    private email: any;
    textUserName = 0;

    constructor(
        private adminService: AdminService,
        private services: ServicesService,
        private enableAccountService: EnableAccountService,
        private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private translate: TranslateService,
        private modalService: BsModalService,
        private renderer: Renderer2,
        private router: Router
    ) {
        this.renderer.setStyle(document.body, 'margin-left', '30px');
        this.renderer.setStyle(document.body, 'margin-right', '30px');
        this.emailPattern = environment.emailPattern;
        this.firstStep = this.formBuilder.group({
            lastname: ['', Validators.compose([Validators.required])],
            firstname: ['', Validators.compose([Validators.required])],
            phone: ['', Validators.compose([Validators.required])],
            address: ['', Validators.compose([Validators.required])],
        });

        this.secondStep = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
            password: ['', Validators.compose([Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.required])],
            registrationQuestions: ['', Validators.compose([Validators.required])],
            answer: ['', Validators.compose([Validators.required])]
        }, {
            validator: PasswordMatchDirective.MatchPassword
        });

        this.thirdStep = this.formBuilder.group({
            numeroContrat: ['', Validators.compose([Validators.required])],
            numeroFacture: ['', Validators.compose([Validators.required])],
            month: ['', Validators.compose([Validators.required])]
        });
        this.attachContractRequest = {
            status: undefined,
            message: undefined
        }
    }

    ngOnInit() {
        this.renderer.setStyle(document.body, 'margin-left', '30px');
        this.renderer.setStyle(document.body, 'margin-right', '30px');
        this.adminService.getRegistrationQuestions().subscribe(response => {
            this.registrationQuestions = response.data;
        }, err => {
            console.log(err);
        });
    }

    registerUser() {
        this.adminService.saveUser(this.clientRecap).subscribe(response => {
            console.log(response);
            this.enableAccountService.sendToken(this.clientRecap.email).subscribe(resp => {
                this.toastrService.success(this.translate.instant('MSG_SUCCES_REGISTER'), '');
                this.router.navigate(['/home']);
            })
        })
    }

    setCheckbox() {
        this.checkbox = !this.checkbox;
    }

    linkContract() {
        const contractLink = {
            numeroContrat: this.thirdStep.controls['numeroContrat'].value,
            numeroFacture: this.thirdStep.controls['numeroFacture'].value,
            month: this.thirdStep.controls['month'].value
        };
        this.services.registerAttachContract(contractLink.numeroContrat, contractLink.numeroFacture, contractLink.month)
            .subscribe(response => {
                if (response.data) {
                    this.basicContractDto = {
                        contractNo: contractLink.numeroContrat,
                        childs: response.data.childs,
                        type: response.data.type,
                        typeNetwork: response.data.typeNetwork
                    };
                    this.attachContractRequest.status = 'success';
                    this.attachContractRequest.message = this.translate.instant('CONTRACT_ATTACHABLE');
                } else {
                    this.attachContractRequest.status = 'warning';
                    this.attachContractRequest.message = this.translate.instant('CONTRACT_UNATTACHABLE');
                }
            }, error => {
                this.attachContractRequest.status = undefined;
                /*
                  this.attachContractRequest.status = 'danger';
                  this.attachContractRequest.message = this.translate.instant('SERVER_ERROR');
                  */
                console.log(error);
            })
    }

    generateRecap() {
        this.clientRecap = {
            firstname: this.firstStep.controls['firstname'].value,
            lastname: this.firstStep.controls['lastname'].value,
            address: this.firstStep.controls['address'].value,
            phone: this.firstStep.controls['phone'].value,
            email: this.secondStep.controls['username'].value,
            username: this.secondStep.controls['username'].value,
            password: this.secondStep.controls['password'].value,
            registrationQuestion: this.secondStep.controls['registrationQuestions'].value,
            registrationAnswer: this.secondStep.controls['answer'].value,
            basicContractDto: this.basicContractDto,
            numeroContrat: this.thirdStep.controls['numeroContrat'].value,
            numeroFacture: this.thirdStep.controls['numeroFacture'].value,
            selectedMonth: this.months[this.thirdStep.controls['month'].value - 1],
            month: this.thirdStep.controls['month'].value,
        };
        console.log(this.clientRecap);
    }

    changeText() {
        if (this.secondStep.controls['username'].valid) {
            const username = {
                username: this.secondStep.controls['username'].value
            };
            this.textUserName = 1;
            this.services.testUserName(username).subscribe(response => {
                console.log(response);
                this.textUserName = 2;
            }, error => {
                console.log(error);
                this.textUserName = 3;
            })
        }
    }

    showModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.modalOptions);
    }

}
