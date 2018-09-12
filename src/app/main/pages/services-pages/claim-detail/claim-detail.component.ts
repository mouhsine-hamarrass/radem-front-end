import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../services/services.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ClaimModel} from '../../../models/claim.model';
import {FeedbackModel} from '../../../models/feedback.model';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss']
})
export class ClaimDetailComponent implements OnInit {

  protected feedback = new FormControl('');
  protected claim: ClaimModel;

  constructor(private myServices: ServicesService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.myServices.getComplaint(id).subscribe(response => {
      this.claim = response.data
      if (this.claim.feedbacks == null) {
        this.claim.feedbacks = [];
      }

      this.claim.feedbacks.reverse();
    }, err => {
    });
  }

  saveFeedback() {
    if (!this.claim.feedbacks) {
      this.claim.feedbacks = [];
    }
    this.claim.feedbacks.push(new FeedbackModel(this.feedback.value, new Date(), false, true));
    this.myServices.saveComplaint(this.claim).subscribe(response => {
      this.feedback.reset();
      this.ngOnInit();
    });
  }
}
