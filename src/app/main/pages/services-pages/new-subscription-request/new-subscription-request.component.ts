import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ServicesService} from '../../../services/services.service';
import {SubscriptionReqModel} from '../../../models/subscriptionReq.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-subscription-request',
  templateUrl: './new-subscription-request.component.html',
  styleUrls: ['./new-subscription-request.component.scss']
})
export class NewSubscriptionRequestComponent implements OnInit {
  subscriptionForm: FormGroup;

  constructor(private servicesService: ServicesService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.subscriptionForm = this.formBuilder.group({
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
  }

  changeSuccessor($event) {
    if ($event.target.checked) {
      this.subscriptionForm.controls['successor'].setValidators([Validators.required]);
      this.subscriptionForm.controls['contract'].setValidators([Validators.required]);

    } else {

      this.subscriptionForm.controls['successor'].clearValidators();
      this.subscriptionForm.controls['successor'].updateValueAndValidity();

      this.subscriptionForm.controls['contract'].clearValidators();
      this.subscriptionForm.controls['contract'].updateValueAndValidity();

      this.subscriptionForm.controls['oldWaterSubscription'].clearValidators();
      this.subscriptionForm.controls['oldWaterSubscription'].updateValueAndValidity();
    }

  }

  saveRequest(formData): void {
    const subscriptionReq: SubscriptionReqModel = formData;
    if (this.subscriptionForm.controls['subscriptionType'].value) {
      subscriptionReq.subscriptionType = 'MUTATION';


      console.log(this.subscriptionForm.controls['contractType'].value !== 'Water');
      if (this.subscriptionForm.controls['contractType'].value === 'Water') {
        subscriptionReq.oldWaterSubscription = this.subscriptionForm.controls['contract'].value;
        subscriptionReq.oldElectricitySubscription = null;

      } else {
        subscriptionReq.oldElectricitySubscription = this.subscriptionForm.controls['contract'].value;
        subscriptionReq.oldWaterSubscription = null;
      }


    } else {
      subscriptionReq.subscriptionType = 'NEW';
    }

    this.servicesService.saveSubscriptionRequest(subscriptionReq).subscribe(response => {
      console.log(response);
      this.router.navigate(['/services'])
    }, err => {
      console.log(err);
    });
    console.log(subscriptionReq);
  }

}
