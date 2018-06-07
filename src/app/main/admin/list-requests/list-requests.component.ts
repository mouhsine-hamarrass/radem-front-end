import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.scss']
})
export class ListRequestsComponent implements OnInit {

  constructor() { }
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
  }

}
