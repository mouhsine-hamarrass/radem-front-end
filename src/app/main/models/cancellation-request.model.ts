import {StatusModel} from './status.model';
import {FeedbackModel} from './feedback.model';
import {ViewChild} from '@angular/core';
import {WizardComponent} from 'angular-archwizard';

export class CancellationRequestModel{
  id?: number;
  requestNo?: string;
  createdAt?: string;
  modifiedAt?: string;
  counterRemovalDate?: string;
  contract?: string;
  feedbacks?: Array<FeedbackModel>;
  status?: StatusModel;
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  constructor(id: number,
              requestNo: string,
              createdAt: string,
              modifiedAt: string,
              counterRemovalDate?: string,
              contract: string = "",
              feedbacks: Array<FeedbackModel>=null,
              status: StatusModel=null
  ) {

    this.id = id;
    this.requestNo = requestNo;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.counterRemovalDate = counterRemovalDate;
    this.contract = contract;
    this.feedbacks = feedbacks;
    this.status = status;
  }
}
