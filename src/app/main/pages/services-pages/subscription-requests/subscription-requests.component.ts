import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../../../services/services.service';

@Component({
  selector: 'app-subscription-requests',
  templateUrl: './subscription-requests.component.html',
  styleUrls: ['./subscription-requests.component.scss']
})
export class SubscriptionRequestsComponent implements OnInit {

  subscriptionRequests: Array<any>;

  constructor(private myServices: ServicesService) { }

  ngOnInit() {
    this.getSubscriptions();
  }

  getSubscriptions(): void {
    this.myServices.getSubscriptionRequests().subscribe(response => {
      this.subscriptionRequests = response.data;
      console.log(this.subscriptionRequests);
    }, err => {});
  }

}
