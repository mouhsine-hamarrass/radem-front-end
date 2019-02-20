import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ServicesService} from '../../../services/services.service';

@Component({
  selector: 'app-new-subscription-request',
  templateUrl: './new-subscription-request.component.html',
  styleUrls: ['./new-subscription-request.component.scss']
})
export class NewSubscriptionRequestComponent implements OnInit {
  subscriptionForm: FormGroup;

  constructor(private servicesService: ServicesService,
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
      'address_supplement': ['', Validators.compose(
        [
          Validators.required
        ])],
      'subscriptionType': ['', Validators.compose(
        [
          Validators.required
        ])],
      'predecessor': ['', Validators.compose(
        [
          Validators.required
        ])],
      'oldWaterSubscription': ['', Validators.compose(
        [
          Validators.required
        ])],
      'oldElectricitySubscription': ['', Validators.compose(
        [
          Validators.required
        ])]
    });
  }

  ngOnInit() {
  }

  saveRequest(): void {
    const subscriptionReq: any = {};
    this.servicesService.saveSubscriptionRequest(subscriptionReq).subscribe(response => {
      console.log(response);
    }, err => {
    });
    console.log(subscriptionReq);
  }

}
