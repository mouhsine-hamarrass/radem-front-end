import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServicesService} from '../../../services/services.service';
import {Router} from '@angular/router';
import {ContractAttachModel} from '../../../models/contract-attach.model';
import {CommonService} from '../../../services/common.service';
import * as _ from 'underscore';
import {ContractRefund} from '../../../models/contract-refund.model';
import {HttpResponse} from '@angular/common/http';
import {NewRefundRequestModel} from '../../../models/new-refund-request.model';
import {User} from '../../../models/user.model';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {ApplicantModel} from '../../../models/applicant.model';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-new-refund-request',
    templateUrl: './new-refund-request.component.html',
    styleUrls: ['./new-refund-request.component.scss']
})
export class NewRefundRequestComponent implements OnInit {

    refundForm: FormGroup;
    clientContracts: Array<ContractAttachModel>;
    contractNo: string;
    public flagModeRemboursement = '';
    public flagProcuration = '';

    ccc: Array<ContractRefund> = [];
    ddd: any = {};
    sss: any = [];
    clientContractsNo: Array<string> = [];
    settings = {};
    selectedNumber = 0;
    selectedFiles: FileList;
    nnn: Array<string> = [];
    mmm: Array<number> = [];
    attachments: any = [];


    constructor(private servicesService: ServicesService,
                private commonService: CommonService,
                private router: Router,
                private authHelper: AuthHelper,
                private formBuilder: FormBuilder) {
        this.settings = {
            singleSelection: false,
            text: 'Filtrer les contrats',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            searchPlaceholderText: 'Filtrer les contrats',
            enableSearchFilter: true,
            badgeShowLimit: 5,
            groupBy: 'consumptionAddress',
            enableCheckAll: false,
        };
        this.refundForm = this.formBuilder.group({
            'firstName': ['', Validators.compose(
                [
                    Validators.required
                ])],
            'contracts': ['', Validators.compose(
                [
                    Validators.required
                ])],
            'lastName': ['', Validators.compose(
                [
                    Validators.required
                ])],
            'cellphone': ['', Validators.compose(
                [
                    Validators.required
                ])],
            'homePhonenumber': ['', Validators.compose(
                [
                    Validators.required
                ])],
            'email': ['', Validators.compose(
                [
                    Validators.required,
                    Validators.email
                ])],
            'cin': ['', Validators.compose(
                [
                    Validators.required
                ])],
            'mailingAddress': ['', Validators.compose(
                [
                    Validators.required
                ])],
            'ModeRemboursement': ['CHECK'],
            'bank_file': [''],
            'Procuration': ['']
        });
    }

    ngOnInit() {
        this.getClientAttachedContracts();
        this.setProcurationValidators();
        this.flagModeRemboursement = 'CHECK';
        // this.refundForm.get('ModeRemboursement').setValue('CHECK');

        const user: User = this.authHelper.getLoggedUserInfo();
        this.refundForm.get('email').setValue(user.email);
        this.refundForm.get('cellphone').setValue(user.phone);
        this.refundForm.get('mailingAddress').setValue(user.address);
        this.refundForm.get('firstName').setValue(user.firstname);
        this.refundForm.get('lastName').setValue(user.lastname);
    }

    selectFile(event: any, input?: any) {
        this.selectedFiles = event.target.files;
        this.upload();
    }

    upload() {
        _.each(this.selectedFiles, (file) => {
            this.servicesService.pushFileToStorage(file).subscribe(event => {
                if (event instanceof HttpResponse) {
                    if (event.body) {
                        const response = JSON.parse(<string>event.body);
                        this.attachments.push({
                            id: response['data'][0],
                            size: file.size,
                            name: file.name
                        });
                        console.log(this.attachments);
                    }
                }
            }, (err) => {
                if (err.status === 413) {
                }
            });
        });
        this.selectedFiles = undefined;
    }

    onCloseMultiSelect(item: any) {
        this.getRefundedContracts();
        this.onItemSelect(item);
        this.onItemDeSelect(item);
    }

    onItemSelect(item: any) {
        console.log(item.tourNo);
        this.selectedNumber++;
        const iii: Array<ContractRefund> = this.ccc;
        this.ccc = [];
        iii.forEach(value => {
            if (value.tourNo === item.tourNo) {
                this.ccc.push(value);
            }
            if (this.selectedNumber === 0) {
                this.getRefundedContracts();
            }
        });
        console.log(this.ccc);
    }

    onItemDeSelect(item: any) {
        console.log(item.tourNo);
        this.selectedNumber--;
        const iii: Array<ContractRefund> = this.ccc;
        this.ccc = [];
        iii.forEach(value => {
            if (value.tourNo === item.tourNo) {
                this.ccc.push(value);
            }
            if (this.selectedNumber === 0) {
                this.getRefundedContracts();
            }
        });
        console.log(this.ccc);
    }

    setPaymentModeValidators() {
        const bankfileControl = this.refundForm.get('bank_file');

        this.refundForm.get('ModeRemboursement').valueChanges
            .subscribe(Mode => {
                if (Mode === 'CHECK') {
                    bankfileControl.setValidators(null);
                }

                if (Mode === 'BANK_TRANSFER') {
                    bankfileControl.setValidators([Validators.required]);
                }

                bankfileControl.updateValueAndValidity();
            });
    }

    setProcurationValidators() {

        const firstNameControl = this.refundForm.get('firstName');
        const lastNameControl = this.refundForm.get('lastName');
        const cinControl = this.refundForm.get('cin');

        this.refundForm.get('Procuration').valueChanges
            .subscribe(userinfos => {

                if (userinfos) {
                    firstNameControl.setValidators([Validators.required]);

                    lastNameControl.setValidators([Validators.required]);
                    cinControl.setValidators([Validators.required]);
                }

                if (!userinfos) {
                    firstNameControl.setValidators(null);
                    lastNameControl.setValidators(null);
                    cinControl.setValidators(null);
                }

                firstNameControl.updateValueAndValidity();
                lastNameControl.updateValueAndValidity();
                cinControl.updateValueAndValidity();
            });

    }

    getRefundedContracts() {
        this.servicesService.getRefundedContracts(this.clientContractsNo).subscribe(response => {
            this.ccc = response.data;
            _.each(this.ccc, (element: any) => {
                _.extend(element, {
                    id: element.contractNo,
                    tourNo: element.tourNo,
                    itemName: `${element.contractNo} - (${element.consumptionAddress})`
                });
            });
        }, err => {
            console.log(err)
        });
    }

    getClientAttachedContracts() {
        this.servicesService.clientAttachedContracts().subscribe(response => {
            this.clientContracts = response.data;
            _.each(this.clientContracts, (element: any) => {
                this.clientContractsNo.push(element.contractNo);
            });
            console.log(this.clientContractsNo);
            this.getRefundedContracts();
        }, err => {
            console.log(err)
        });
    }

    changeSuccessor($event) {
        if ($event.target.checked) {
            this.refundForm.controls['successor'].setValidators([Validators.required]);
            this.refundForm.controls['contract'].setValidators([Validators.required]);

        } else {

            this.refundForm.controls['successor'].clearValidators();
            this.refundForm.controls['successor'].updateValueAndValidity();

            this.refundForm.controls['contract'].clearValidators();
            this.refundForm.controls['contract'].updateValueAndValidity();

            this.refundForm.controls['oldWaterSubscription'].clearValidators();
            this.refundForm.controls['oldWaterSubscription'].updateValueAndValidity();
        }

    }

    saveRequest(formData): void {
        const user: User = this.authHelper.getLoggedUserInfo();

        const newRefundrequest: NewRefundRequestModel = formData;
        newRefundrequest.mail = formData.email;
        newRefundrequest.mailingAddress = formData.mailingAddress;
        newRefundrequest.cellphone = formData.cellphone;
        newRefundrequest.fixphone = formData.homePhonenumber;

        newRefundrequest.paymentMode = formData.ModeRemboursement;
        newRefundrequest.procuration = Boolean(this.flagProcuration);
        newRefundrequest.procuratorCin = formData.cin;
        newRefundrequest.procuratorFirstname = formData.firstName;
        newRefundrequest.procuratorLastname = formData.lastName;
        this.attachments.forEach(value => {
            this.mmm.push(value.id);
        });
        newRefundrequest.attachmentIds = this.mmm;
        this.sss.forEach(value => {
            this.nnn.push(value.contractNo);
            newRefundrequest.tour = value.tourNo;
        });
        newRefundrequest.contractNbrs = this.nnn;

        this.servicesService.saveNewRefundRequest(newRefundrequest).subscribe(response => {
            console.log(response);
            if (response && response.data) {
                this.router.navigate(['/services/new-refund-detail/' + response.data]);
            }

            /* Swal({
                 title: 'Merci pour votre Collaboration',
                 text: 'votre demande de remboursement a été envoyé avec succès',
                 type: 'success',
                 showCancelButton: true,
                 confirmButtonText: 'Voulez-vous Telecharger le PDF',
                 cancelButtonText: 'Non, Merci'
             }).then((result) => {
                 if (result.value) {
                     this.router.navigate(['/services/refund-requests']);
                 } else if (result.dismiss === Swal.DismissReason.cancel) {
                     this.router.navigate(['/services/refund-requests']);
                 }
             })*/
            // this.router.navigate(['/services'])
        }, err => {
            console.log(err);
        });
        console.log(newRefundrequest);
    }

    setContract(contractNo: string) {
        this.contractNo = contractNo;
        // this.getRefunds(this.contractNo);
    }

}
