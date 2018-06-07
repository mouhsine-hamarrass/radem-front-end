import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-complaints',
  templateUrl: './list-complaints.component.html',
  styleUrls: ['./list-complaints.component.scss']
})
export class ListComplaintsComponent implements OnInit {

  constructor() { }
  public complaints = [
    {
      nb_complaint : 6448926,
      client : 'Adnane',
      type : 'abonnement',
      creation_date : '01/01/2018',
      agent : 'Mohammed',
      service : 'Service A',
      status : 'In progress',
    }, {
      nb_complaint : 8567309,
      client : 'Younes',
      type : 'Résiliation',
      creation_date : '01/01/2018',
      agent : 'Mohammed',
      service : 'Service A',
      status : 'Finished',
    }, {
      nb_complaint : 8567309,
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
