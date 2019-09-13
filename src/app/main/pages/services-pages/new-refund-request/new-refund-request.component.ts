import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServicesService} from '../../../services/services.service';
import {Router} from '@angular/router';
import {ContractAttachModel} from '../../../models/contract-attach.model';
import {CommonService} from '../../../services/common.service';
import * as _ from 'underscore';
import {ContractRefund} from '../../../models/contract-refund.model';
import {HttpEventType, HttpHeaderResponse, HttpResponse} from '@angular/common/http';
import {NewRefundRequestModel} from '../../../models/new-refund-request.model';
import {User} from '../../../models/user.model';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';


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
  progress: { percentage: number } = {percentage: 0};
  uploadfaild = false;
  currentFileUpload: File;

  contractRefunds: Array<ContractRefund> = [];
  selectedRefContrcats: any = [];
  clientContractsNo: Array<string> = [];
  settings = {};
  selectedNumber = 0;
  selectedFile: FileList;
  contractNbrs: Array<string> = [];
  attachmentIds: Array<number> = [];
  attachments: any = [];


  constructor(private servicesService: ServicesService,
              private commonService: CommonService,
              private router: Router,
              private authHelper: AuthHelper,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private translate: TranslateService) {
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
      'cin': ['', Validators.compose(
          [
            Validators.required
          ])],
      'email': ['', Validators.compose(
        [
          Validators.required,
          Validators.email
        ])],
      'procuratorCin': ['', Validators.compose(
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
    this.selectedFile = event.target.files;
    this.upload();
  }

  upload() {
    this.progress.percentage = 0;
    this.uploadfaild = false;
    _.each(this.selectedFile, (file) => {
      this.currentFileUpload = file;
      this.servicesService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        if (event && event instanceof HttpHeaderResponse && event.status === 400) {
          this.progress.percentage = 0;
          this.toastrService.error(this.translate.instant('file-not-uploaded'));
          this.uploadfaild = true;
          this.selectedFile = null;
        }
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
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
          this.toastrService.error(this.translate.instant('file-payload-too-large') + err.error, '');
        } else {
          this.toastrService.error(this.translate.instant('file-not-uploaded'));
        }
        this.uploadfaild = true;

        this.selectedFile = null;

      });
    });
  }

  onCloseMultiSelect(item: any) {
    this.getRefundedContracts();
    this.onItemSelect(item);
    this.onItemDeSelect(item);
  }

  onItemSelect(item: any) {
    console.log(item.tourNo);
    this.selectedNumber++;
    const iii: Array<ContractRefund> = this.contractRefunds;
    this.contractRefunds = [];
    iii.forEach(value => {
      if (value.tourNo === item.tourNo) {
        this.contractRefunds.push(value);
      }
      if (this.selectedNumber === 0) {
        this.getRefundedContracts();
      }
    });
    console.log(this.contractRefunds);
  }

  onItemDeSelect(item: any) {
    console.log(item.tourNo);
    this.selectedNumber--;
    const iii: Array<ContractRefund> = this.contractRefunds;
    this.contractRefunds = [];
    iii.forEach(value => {
      if (value.tourNo === item.tourNo) {
        this.contractRefunds.push(value);
      }
      if (this.selectedNumber === 0) {
        this.getRefundedContracts();
      }
    });
    console.log(this.contractRefunds);
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
    const cinControl = this.refundForm.get('procuratorCin');

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
      this.contractRefunds = response.data;
      _.each(this.contractRefunds, (element: any) => {
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

  saveRequest(form): void {
    const user: User = this.authHelper.getLoggedUserInfo();
    if (form && form.valid && form.value) {
      const formData = form.value;
      const newRefundrequest: NewRefundRequestModel = form.value;
      newRefundrequest.mail = formData.email;
      newRefundrequest.mailingAddress = formData.mailingAddress;
      newRefundrequest.cellphone = formData.cellphone;
      newRefundrequest.cin = formData.cin;
      newRefundrequest.fixphone = formData.homePhonenumber;

      newRefundrequest.paymentMode = formData.ModeRemboursement;
      newRefundrequest.procuration = Boolean(this.flagProcuration);
      newRefundrequest.procuratorCin = formData.procuratorCin;
      newRefundrequest.procuratorFirstname = formData.firstName;
      newRefundrequest.procuratorLastname = formData.lastName;
      this.attachments.forEach(value => {
        this.attachmentIds.push(value.id);
      });
      newRefundrequest.attachmentIds = this.attachmentIds;
      this.selectedRefContrcats.forEach(value => {
        this.contractNbrs.push(value.contractNo);
        newRefundrequest.tour = value.tourNo;
      });
      newRefundrequest.contractNbrs = this.contractNbrs;

      this.servicesService.saveNewRefundRequest(newRefundrequest).subscribe(response => {

        console.log(response);

        if (response && response.data) {
          this.router.navigate(['/services/new-refund-details/' + response.data]);
        }

      }, err => {
        console.log(err);
        this.toastrService.error(this.translate.instant('new-refund-error'));

      });
    } else {
      this.toastrService.error(
        this.translate.instant('merci-de-remplir-les-champs-obligatoires-dans-le-formulaire'), this.translate.instant('formulaire-invalide')
      );
    }

  }

  setContract(contractNo: string) {
    this.contractNo = contractNo;
    // this.getRefunds(this.contractNo);
  }

  test(){
    console.log(this.refundForm);
  }

}
