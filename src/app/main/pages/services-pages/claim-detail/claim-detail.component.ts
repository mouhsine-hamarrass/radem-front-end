import {Component, OnInit, ViewChild, ElementRef, EventEmitter, AfterViewInit} from '@angular/core';
import {ServicesService} from '../../../services/services.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';
import {FeedbackModel} from '../../../models/feedback.model';
import {ComplaintModel} from '../../../models/complaint.model';
import {WizardComponent, WizardState} from 'angular-archwizard';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss']
})
export class ClaimDetailComponent implements OnInit , AfterViewInit {
  @ViewChild(WizardComponent) public wizard: WizardComponent;
  @ViewChild('StepButton') StepButton: ElementRef;
  @ViewChild('UpdateButton') UpdateButton: ElementRef;
  @ViewChild('commentaire') commentaire: ElementRef;

  feedback = new FormControl('');
  complaint: ComplaintModel;
  selectedStep: number;
  private wizardState: WizardState;

  constructor(
    private myServices: ServicesService,
    private route: ActivatedRoute
  ) {
  }

  ngAfterViewInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.myServices.getComplaint(id).subscribe(response => {
      this.complaint = response.data;
      if (this.complaint.feedbacks == null) {
        this.complaint.feedbacks = [];
      }

      if (this.complaint) {
        switch (this.complaint.status) {
          case 'CREATED':
            this.selectedStep = 0;
            break;
          case 'SUPPORTED':
            this.selectedStep = 1;
            break;
          case 'ANALYSIS':
            this.selectedStep = 2;
            break;
          case 'REQUEST_COMPLEMENT':
            this.selectedStep = 3;
            break;
          case 'TRANSMISSION_OF_INFORMATION':
            this.selectedStep = 4;
            break;
          case 'REPLY_PROVIDED':
            this.selectedStep = 5;
            break;
          case 'CLOSED':
            this.selectedStep = 6;
            break;
        }
      } else {
        this.selectedStep = 0;
      }

      this.wizardState = this.wizard.model;

      this.wizardState.navigationMode.goToStep(
        this.selectedStep,
        new EventEmitter(),
        new EventEmitter()
      );

      this.complaint.feedbacks.reverse();
    }, err => {
    });
  }

  ngOnInit() {
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
