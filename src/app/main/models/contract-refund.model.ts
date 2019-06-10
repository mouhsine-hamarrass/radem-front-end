export class ContractRefund {
  contractNo?: string;
  consumptionAddress?: string;
  tourNo?: string;

  constructor(contractNo: string, consumptionAddress: string, tourNo: string) {
    this.contractNo = contractNo;
    this.consumptionAddress = consumptionAddress;
    this.tourNo = tourNo;
  }
}
