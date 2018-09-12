import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServicesService } from '../../../services/services.service';

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

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
  }

  saveRequest(): void {
    let subscriptionReq: any = {
      requestNumber : 1111,
      client : JSON.parse(localStorage.getItem('user')),
      subscriptionType : 'NEW'
    };
    if (this.subscriptionRequestForm.controls.subscriptionType.value) {
      subscriptionReq.predecessor = this.subscriptionRequestForm.controls.predecessor.value;
      subscriptionReq.oldWaterSubscription = this.subscriptionRequestForm.controls.oldWaterSubscription.value;
      subscriptionReq.oldElectricitySubscription = this.subscriptionRequestForm.controls.oldElectricitySubscription.value;
      subscriptionReq.subscriptionType = 'MUTATION';
    }
    subscriptionReq = {
      requestNumber : 1122
    }
    this.servicesService.saveSubscriptionRequest(subscriptionReq).subscribe(response => {
      console.log(response);
    }, err => {});
    console.log(subscriptionReq);
  }

}
