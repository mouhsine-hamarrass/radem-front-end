import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServicesService} from '../../../services/services.service';
import {Router} from '@angular/router';
import {SubscriptionReqModel} from '../../../models/subscriptionReq.model';
import {ContractAttachModel} from '../../../models/contract-attach.model';

@Component({
  selector: 'app-new-refund-request',
  templateUrl: './new-refund-request.component.html',
  styleUrls: ['./new-refund-request.component.scss']
})
export class NewRefundRequestComponent implements OnInit {

  refundForm: FormGroup;
  clientContracts: Array<ContractAttachModel>;
  contractNo: string;

  constructor(private servicesService: ServicesService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.refundForm = this.formBuilder.group({
      'firstAndLastName': ['', Validators.compose(
        [
          Validators.required
        ])],
      'profession': ['', Validators.compose(
        [
          Validators.required
        ])],
      'workingPlace': ['', Validators.compose(
        [
          Validators.required
        ])],
      'addressOfWork': ['', Validators.compose(
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
      'workPhonenumber': ['', Validators.compose(
        [
          Validators.required
        ])],
      'adressNumber': ['', Validators.compose(
        [
          Validators.required
        ])],
      'address': ['', Validators.compose(
        [
          Validators.required
        ])],
      'building': ['', Validators.compose(
        [
          Validators.required
        ])],
      'apartment': ['', Validators.compose(
        [
          Validators.required
        ])],
      'floor': ['', Validators.compose(
        [
          Validators.required
        ])],
      'address_supplement': [''],
      'subscriptionType': [''],
      'successor': [''],
      'contractType': ['Water'],
      'contract': [''],
      'oldWaterSubscription': [null],
      'oldElectricitySubscription': [null]
    });
  }

  ngOnInit() {
    this.getClientAttachedContracts();
  }


  getClientAttachedContracts() {
    this.servicesService.clientAttachedContracts().subscribe(response => {
      this.clientContracts = response.data;
      if (this.clientContracts.length) {
        // this.setReportContract(this.clientContracts[0].contractNo);
      }
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
    const subscriptionReq: SubscriptionReqModel = formData;
    this.servicesService.saveSubscriptionRequest(subscriptionReq).subscribe(response => {
      console.log(response);
      this.router.navigate(['/services'])
    }, err => {
      console.log(err);
    });
    console.log(subscriptionReq);
  }

  setContract(contractNo: string) {
    this.contractNo = contractNo;
    // this.getRefunds(this.contractNo);
  }

}
