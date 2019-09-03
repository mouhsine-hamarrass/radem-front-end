import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {DynamicModel} from '../../models/dynamic.model';

@Component({
  selector: 'app-service-approach-page',
  templateUrl: './service-approach-page.component.html',
  styleUrls: ['./service-approach-page.component.scss']
})
export class ServiceApproachPageComponent implements OnInit {

    dynamic: DynamicModel;

  constructor(private adminServices: AdminService) { }

  ngOnInit() {

      this.adminServices.getDynamicContent('serv_demarche').subscribe(
          response => {
              this.dynamic = response.data;
          },
          err => {
              console.log(err);
          }
      );
  }

}
