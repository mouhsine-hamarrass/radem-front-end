import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../core/services/request.service';
import _ = require('underscore');

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.scss']
})
export class ListRequestsComponent implements OnInit {

  constructor(private requestService: RequestService) { }
  public terminationRequests: any;
  public requests: any;

  ngOnInit() {
   this.LoadTerminationRequest();
  }

  LoadTerminationRequest() {
    this.requestService.getTerminationRequests().subscribe(response => {
      this.requests = response.data;
      console.log(this.requests);
      _.each(this.requests, (element: any) => {
        _.extend(element, {type: 'Résiliation'});
      });
    }, (err) => {

    });
  }

}
