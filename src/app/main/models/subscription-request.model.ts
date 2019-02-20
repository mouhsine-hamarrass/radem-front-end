import {StatusModel} from './status.model';
import {FeedbackModel} from './feedback.model';
import {RequestSubscriptionTypeEnum} from '../../shared/models/user.model';
import {ViewChild} from '@angular/core';
import {WizardComponent} from 'angular-archwizard';

export class SubscriptionRequestModel {
  id?: number;
  requestNo?: string;
  createdAt?: string;
  modifiedAt?: string;
  subscriptionType?: RequestSubscriptionTypeEnum;
  contract?: string;
  predecessor?: string;
  feedbacks?: Array<FeedbackModel>;
  networkType?: string;
  oldSubscription?: string;
  status?: StatusModel;
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  constructor(id: number,
              requestNo: string,
              createdAt: string,
              modifiedAt: string,
              subscriptionType: RequestSubscriptionTypeEnum,
              contract: string,
              predecessor: string,
              feedbacks: Array<FeedbackModel>,
              networkType: string,
              oldSubscription: string,
              status: StatusModel
  ) {

    this.id = id;
    this.requestNo = requestNo;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.subscriptionType = subscriptionType;
    this.contract = contract;
    this.predecessor = predecessor;
    this.feedbacks = feedbacks;
    this.networkType = networkType;
    this.oldSubscription = oldSubscription;
    this.status = status;
  }
}
