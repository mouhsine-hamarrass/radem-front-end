import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-subscription-request',
  templateUrl: './new-subscription-request.component.html',
  styleUrls: ['./new-subscription-request.component.scss']
})
export class NewSubscriptionRequestComponent implements OnInit {

  public subscriptionRequestForm = new FormGroup({
    subscriptionType: new FormControl(''),
    firstAndLastName: new FormControl(''),
    profession: new FormControl(''),
    workingPlace: new FormControl(''),
    addressOfWork: new FormControl(''),
    cellphone: new FormControl(''),
    homePhonenumber: new FormControl(''),
    workPhonenumber: new FormControl(''),
    address: new FormControl(''),
    predecessor: new FormControl(''),
    oldWaterSubscription: new FormControl(''),
    oldElectricitySubscription: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  saveRequest(): void {

  }

}
