import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ServicesService} from '../../../services/services.service';

@Component({
  selector: 'app-cancellation-request',
  templateUrl: './cancellation-request.component.html',
  styleUrls: ['./cancellation-request.component.scss']
})
export class CancellationRequestComponent implements OnInit {

  public feedback = new FormControl('');

  protected terminationRequest: any;

  constructor(private myServices: ServicesService) {
  }

  ngOnInit() {
    this.myServices.getTerminationRequest(1).subscribe(response => {
      this.terminationRequest = response.data;
      console.log(this.terminationRequest);
    });
  }

  saveFeedback() {
    console.log(new Date());
    this.terminationRequest.feedback = [{message: this.feedback.value, sendingDate: new Date()}];
    this.myServices.getSubscriptions().subscribe(response => {
      this.terminationRequest.subscriptions = response.data;
      this.myServices.saveTerminationRequest(this.terminationRequest).subscribe(response2 => {
        console.log(this.terminationRequest);
        this.feedback.reset();
      });
    });
  }
}
