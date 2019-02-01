import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
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

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
    method = 'BILL';
    months = ['Janv.', 'Févr.', 'Mars.', 'Avr.', 'Mai.', 'Juin.', 'Juil.', 'Août.', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
    registerForm: FormGroup;

    attachContractRequest: any;

    modalRef: BsModalRef;

    firstStep: FormGroup;
    secondStep: FormGroup;
    thirdStep: FormGroup;

    checkbox = false;
    clicked = false;
    reponse: any;
    ref: any;
    user: any;
    clientRecap: any;
    toStep3 = true;
    registrationQuestions: Array<RegistrationQuestionModel> = [];
    emailPattern: string;
    basicContractDto: any;
    private modalOptions = <ModalOptions>{backdrop: true, ignoreBackdropClick: false, class: 'modal-lg'};

    constructor(
        private adminService: AdminService,
        private enableAccountService: EnableAccountService,
        private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private translate: TranslateService,
        private modalService: BsModalService,
        private router: Router
    ) {
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
            numeroContrat: ['0000003', Validators.compose([Validators.required])],
            numeroFacture: ['0000003', Validators.compose([Validators.required])],
            month: ['10', Validators.compose([Validators.required])],
            combinedContractNo: [null],
        });
        this.attachContractRequest = {
            status: undefined,
            message: undefined
        }
    }

    ngOnInit() {
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
        this.adminService.registerAttachContract(contractLink.numeroContrat, contractLink.numeroFacture, contractLink.month)
            .subscribe(response => {
                if (response.data) {
                    this.basicContractDto = {
                        contractNo: contractLink.numeroContrat,
                        childs: response.data.childs,
                        type: response.data.type
                    };
                    this.attachContractRequest.status = 'success';
                    this.attachContractRequest.message = this.translate.instant('CONTRACT_ATTACHABLE');
                } else {
                    this.attachContractRequest.status = 'warning';
                    this.attachContractRequest.message = this.translate.instant('CONTRACT_UNATTACHABLE');
                }
            }, error => {
                this.attachContractRequest.status = 'danger';
                this.attachContractRequest.message = this.translate.instant('SERVER_ERROR');
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

    showModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.modalOptions);
    }

}
