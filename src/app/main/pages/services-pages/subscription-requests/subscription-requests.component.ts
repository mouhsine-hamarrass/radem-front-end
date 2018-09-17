import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription-requests',
  templateUrl: './subscription-requests.component.html',
  styleUrls: ['./subscription-requests.component.scss']
})
export class SubscriptionRequestsComponent implements OnInit {

  subscriptionRequests: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
