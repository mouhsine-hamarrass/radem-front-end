export class ContactModel {
  id?: number;
  landlinePhoneNumber?: string;
  cellphone?: string;
  consumptionAddress?: string;
  correspondenceAddress?: string;

  constructor(id: number, landlinePhoneNumber: string, cellphone: string, consumptionAddress: string, correspondenceAddress: string) {
    this.id = id;
    this.landlinePhoneNumber = landlinePhoneNumber;
    this.cellphone = cellphone;
    this.consumptionAddress = consumptionAddress;
    this.correspondenceAddress = correspondenceAddress;
  }
}
