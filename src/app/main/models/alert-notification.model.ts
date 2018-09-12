import {ClientModel} from './client.model';
import {SubscriptionModel} from './subscription.model';
import {AlertModel} from './alert.model';

export class AlertNotificationModel {
  id?: number;
  client: ClientModel;
  description: string;
  subscription: SubscriptionModel;
  alert: AlertModel;

  constructor(id: number, client: ClientModel, description: string, subscription: SubscriptionModel, alert: AlertModel) {
    this.id = id;
    this.client = client;
    this.description = description;
    this.subscription = subscription;
    this.alert = alert;
  }
}
