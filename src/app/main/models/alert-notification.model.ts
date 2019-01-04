import {ClientModel} from './client.model';
import {SubscriptionModel} from './subscription.model';
import {AlertModel} from './alert.model';
import {AlertNotificationStatus} from '../../shared/models/user.model';

export class AlertNotificationModel {
    id?: number;
    client: ClientModel;
    description: string;
    instructions: string;
    status: AlertNotificationStatus;
    subscription: SubscriptionModel;
    title: string;
    alert: AlertModel;

    constructor(id: number, client: ClientModel, description: string, subscription: SubscriptionModel, alert: AlertModel) {
        this.id = id;
        this.client = client;
        this.description = description;
        this.subscription = subscription;
        this.alert = alert;
    }
}
