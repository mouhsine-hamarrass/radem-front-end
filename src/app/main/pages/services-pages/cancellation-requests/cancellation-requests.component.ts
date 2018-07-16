import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ServicesService} from '../../../services/services.service';

@Component({
  selector: 'app-cancellation-requests',
  templateUrl: './cancellation-requests.component.html',
  styleUrls: ['./cancellation-requests.component.scss']
})
export class CancellationRequestsComponent implements OnInit {

  protected terminationRequests: any;

  constructor(private myServices: ServicesService) {
  }

  ngOnInit() {
    this.myServices.getTerminationRequests().subscribe(response => {
      this.terminationRequests = response.data;
      console.log(this.terminationRequests);
    }, err => {});
  }
}
