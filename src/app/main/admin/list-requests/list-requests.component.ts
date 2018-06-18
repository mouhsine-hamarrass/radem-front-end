import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../core/services/request.service';

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.scss']
})
export class ListRequestsComponent implements OnInit {

  constructor(private requestService: RequestService) { }
  public terminationRequests: any;
  public requests = [
    {
      nb_request : 6448920,
      client : 'Adnane',
      type : 'abonnement',
      creation_date : '01/01/2018',
      agent : 'Mohammed',
      service : 'Service A',
      status : 'In progress',
    }, {
      nb_request : 8567309,
      client : 'Younes',
      type : 'Résiliation',
      creation_date : '01/01/2018',
      agent : 'Mohammed',
      service : 'Service A',
      status : 'Finished',
    }, {
      nb_request : 8567309,
      client : 'Amine',
      type : 'Réclamation',
      creation_date : '01/01/2018',
      agent : 'Mohammed',
      service : 'Service A',
      status : 'Finished',
    }
  ];

  ngOnInit() {
   /* this.requestService.getTerminationRequests().subscribe(response => {
      this.requests = response.data;
    }, (err) => {

    });*/
  }

  LoadTerminationRequest() {
    /* this.requestService.getTerminationRequests().subscribe(response => {
      this.terminationRequests = response.data;
    }, (err) => {

    });*/
  }

}
