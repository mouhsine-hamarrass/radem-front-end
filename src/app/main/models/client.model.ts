import {ContactModel} from './contact.model';

export class ClientModel {
  id?: number;
  fullName?: string;
  contact?: ContactModel;

  constructor(id: number, fullName: string, contact: ContactModel) {
    this.id = id;
    this.fullName = fullName;
    this.contact = contact;
  }
}
