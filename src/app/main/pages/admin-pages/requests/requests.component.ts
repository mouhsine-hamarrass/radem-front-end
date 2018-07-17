import { Component, OnInit } from '@angular/core';
import _ = require('underscore');
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  public terminationRequests: any;
  public requests: any;

  constructor(private requestService: AdminService) { }


  ngOnInit() {
    this.LoadCancellationRequest();
   }

   LoadCancellationRequest() {
     this.requestService.getTerminationRequests().subscribe(response => {
       this.requests = response.data;
       console.log(this.requests);
       _.each(this.requests, (element: any) => {
         _.extend(element, {type: 'Résiliation'});
       });
     }, (err) => {

     });
   }

   LoadSubscriptionRequest() {
    this.requests = [];
  }

  LoadRefundRequest() {
    this.requests = [];
  }
}
