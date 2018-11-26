import {Component, OnInit, ViewChild, AfterViewInit, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ServicesService} from '../../../services/services.service';
import {ActivatedRoute} from '@angular/router';
import {WizardComponent, WizardState} from 'angular-archwizard';
import * as _ from 'underscore';

@Component({
  selector: 'app-cancellation-request',
  templateUrl: './cancellation-request.component.html',
  styleUrls: ['./cancellation-request.component.scss']
})
export class CancellationRequestComponent implements OnInit, AfterViewInit {
  @ViewChild(WizardComponent) public wizard: WizardComponent;
  public feedback = new FormControl('');

  terminationRequest: any;
  subscriptionIds: any[];
  selectedStep: number;
  private wizardState: WizardState;

  constructor(
    private myServices: ServicesService,
    private route: ActivatedRoute
  ) {
  }

  ngAfterViewInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.myServices.getTerminationRequest(id).subscribe(response => {
      this.terminationRequest = response.data;
      this.subscriptionIds = _.pluck(this.terminationRequest.subscriptions, 'id');
      if (this.terminationRequest) {
        switch (this.terminationRequest.status) {
          case 'CREATED':
            this.selectedStep = 0;
            break;
          case 'RECEIVED':
            this.selectedStep = 1;
            break;
          case 'IN_PROGRESS':
            this.selectedStep = 2;
            break;
          case 'DEPOSITED_COUNTER':
            this.selectedStep = 3;
            break;
          case 'UNPAID_VERIFICATION':
            this.selectedStep = 4;
            break;
          case 'SETTLEMENT':
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
    });

  }

  ngOnInit() {
  }

  saveFeedback() {
    if (!this.terminationRequest.feedback) {
      this.terminationRequest.feedback = [];
    }
    this.terminationRequest.feedback.push({
      message: this.feedback.value,
      sendingDate: new Date()
    });
    this.terminationRequest.subscriptions = this.subscriptionIds;
    this.myServices
      .saveTerminationRequest(this.terminationRequest)
      .subscribe(response => {
        this.feedback.reset();
        this.ngOnInit();
      });
  }
}
