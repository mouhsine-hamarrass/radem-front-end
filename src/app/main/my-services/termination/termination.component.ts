import { Component, OnInit } from '@angular/core';
import { MyServicesService } from '../../core/services/my-services.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-termination',
  templateUrl: './termination.component.html',
  styleUrls: ['./termination.component.scss']
})
export class TerminationComponent implements OnInit {
  protected feedback = new FormControl('');

  protected terminationRequest: any;

  constructor(private myServicesService: MyServicesService) { }

  ngOnInit() {
    this.myServicesService.getTerminationRequest(1).subscribe(response => {
      this.terminationRequest = response.data;
      this.terminationRequest.feedback.reverse();
      console.log(this.terminationRequest);
    });
  }

  saveFeedback() {
    console.log(new Date());
    if (!this.terminationRequest.feedback) {
      this.terminationRequest.feedback = [];
    }
    this.terminationRequest.feedback.push({message: this.feedback.value, sendingDate: new Date()});
    this.myServicesService.getSubscriptions().subscribe(response => {
      this.terminationRequest.subscriptions = response.data;
      this.myServicesService.saveTerminationRequest(this.terminationRequest).subscribe(response2 => {
        this.ngOnInit();
      });
    });
  }


}
