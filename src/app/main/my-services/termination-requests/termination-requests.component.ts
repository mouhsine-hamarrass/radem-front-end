import { Component, OnInit } from '@angular/core';
import { MyServicesService } from '../../core/services/my-services.service';

@Component({
  selector: 'app-termination-requests',
  templateUrl: './termination-requests.component.html',
  styleUrls: ['./termination-requests.component.scss']
})
export class TerminationRequestsComponent implements OnInit {

  protected terminationRequests: any;

  constructor(private myServicesService: MyServicesService) { }

  ngOnInit() {
    this.myServicesService.getTerminationRequests().subscribe(response => {
      this.terminationRequests = response.data;
    });
  }

}
