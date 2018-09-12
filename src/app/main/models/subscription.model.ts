export class SubscriptionModel {
  id?: number;
  subscription?: string;
  tournee?: string;
  type?: string;

  constructor(id: number, subscription: string, tournee: string, type: string) {
    this.id = id;
    this.subscription = subscription;
    this.tournee = tournee;
    this.type = type;
  }
}
