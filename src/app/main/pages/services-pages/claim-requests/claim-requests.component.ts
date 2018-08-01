import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../../../services/services.service';

@Component({
  selector: 'app-claim-requests',
  templateUrl: './claim-requests.component.html',
  styleUrls: ['./claim-requests.component.scss']
})
export class ClaimRequestsComponent implements OnInit {
  protected complaints: any;

  constructor(private myServices: ServicesService) { }

  ngOnInit() {
    this.myServices.getComplaints().subscribe(response => {
      this.complaints = response.data;
      console.log(this.complaints);
    });
  }
}
