import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../services/services.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';
import {FeedbackModel} from '../../../models/feedback.model';
import {ComplaintModel} from '../../../models/complaint.model';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss']
})
export class ClaimDetailComponent implements OnInit {

  feedback = new FormControl('');
  complaint: ComplaintModel;

  constructor(
    private myServices: ServicesService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.myServices.getComplaint(id).subscribe(response => {
      this.complaint = response.data;
      if (this.complaint.feedbacks == null) {
        this.complaint.feedbacks = [];
      }

      this.complaint.feedbacks.reverse();
    }, err => {
    });
  }

  saveFeedback() {
    const complaintsFeedback = {
      id: this.route.snapshot.paramMap.get('id'),
      feedback: new FeedbackModel(this.feedback.value, new Date(), false, true)
    };

    this.myServices.saveComplaintsFeedback(complaintsFeedback).subscribe(response => {
      this.feedback.reset();
      this.ngOnInit();
    });
  }
}
