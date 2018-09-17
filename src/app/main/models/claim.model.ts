import {FeedbackModel} from './feedback.model';
import {UserDetails} from '../../shared/models/user.model';

export class ClaimModel {
  id?: number;
  claimNumber?: string;
  object?: string;
  status?: string;
  avatar?: string;
  description?: string;
  feedbacks: Array<FeedbackModel>;
  complainer: UserDetails;
  agent: UserDetails;
  createdDate: Date;
  updatedDate: Date;
}
