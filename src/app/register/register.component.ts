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
            numeroContrat: ['', Validators.compose([Validators.required])],
            numeroFacture: ['', Validators.compose([Validators.required])],
            month: ['', Validators.compose([Validators.required])]
        });
    }

    ngOnInit() {
        this.adminService.getRegistrationQuestions().subscribe(response => {
            this.registrationQuestions = response.data;
        }, err => {
            console.log(err);
        });
    }

    goToStep3() {
        this.registerForm.controls.firstname2.setValue(this.user[0].firstName);
        this.registerForm.controls.lastname2.setValue(this.user[0].lastName);
        this.registerForm.controls.email.setValue(this.user[0].email);
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

    Verification() {
        this.adminService.getAnswer(this.registerForm.controls.questions.value).subscribe(response => {
            this.reponse = response;
            if (this.reponse[0].answer === this.registerForm.controls.answer.value) {
                this.toStep3 = false;
            } else {
                this.toStep3 = true;
            }
        })
        this.clicked = false;
    }

    setCheckbox() {
        this.checkbox = !this.checkbox;
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
